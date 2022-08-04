function Chain(handler) {
  this.handler = handler;
  this.nextHandler = null;
}

Chain.prototype.setNextHandler = function (nextHandler) {
  this.nextHandler = nextHandler;
};

Chain.prototype.run = function (...args) {
  return new Promise(async (resolve, reject) => {
    let ret = undefined;
    try {
      ret = await this.handler(...args);
      if (ret === "$next") {
        if (this.nextHandler) {
          try {
            const result = await this.nextHandler.run.apply(
              this.nextHandler,
              args
            );
            if (result === "$end") {
              reject(new Error("no one can handle it."));
            } else {
              resolve(result);
            }
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error("no one can handle it."));
        }
      }
      resolve(ret);
    } catch (e) {
      reject(e);
    }
  });
};
