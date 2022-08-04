const PENDING = "PENDING";
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }

  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let called;
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

class PromiseX {
  constructor(executer) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = RESOLVED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executer(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (data) => data;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    const promise2 = new PromiseX((resolve, reject) => {
      if (this.status === RESOLVED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };

    const promise2 = new PromiseX((resolve, reject) => {
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else if (this.status === PENDING) {
        this.onRejectedCallbacks.push(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
    });

    return promise2;
  }

  finally(callback) {
    return this.then(
      (data) => {
        return PromiseX.resolve(callback()).then(() => data);
      },
      (error) => {
        return PromiseX.resolve(callback()).then(() => {
          throw error;
        });
      }
    );
  }
}

PromiseX.isPromise = function (target) {
  if ((target && typeof target === "object") || typeof target === "function") {
    if (target.then && typeof target.then === "function") {
      return true;
    }
  }
  return false;
};

PromiseX.defer = PromiseX.deferred = function () {
  const dfd = {};

  dfd.promise = new PromiseX((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });

  return dfd;
};

PromiseX.all = function (list) {
  return new PromiseX((resolve, reject) => {
    let values = [];
    let index = 0;

    function processData(key, value) {
      values[key] = value;
      if (++index === list.length) {
        resolve(values);
      }
    }

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (PromiseX.isPromise(list[i])) {
        item.then((data) => {
          processData(i, data);
        }, reject);
      } else {
        processData(i, item);
      }
    }
  });
};

PromiseX.resolve = function (value) {
  return new PromiseX((resolve, reject) => {
    resolvePromise(PromiseX, value, resolve, reject);
  });
};

PromiseX.reject = function (reason) {
  return new PromiseX((_, reject) => reject(reason));
};
