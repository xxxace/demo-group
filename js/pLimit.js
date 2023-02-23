function pLimit(concurrentNum) {
    let activityNum = 0;
    const queue = [];

    const next = () => {
        activityNum--;

        if (queue.length > 0) {
            queue.shift()();
        }
    }

    const run = async (fn, resolve, ...args) => {
        activityNum++;

        const res = (async () => fn(...args))();
        // 先返回结果
        resolve(res);

        // 等待执行完成
        try {
            await res;
        } catch { }

        next();
    }

    const enqueue = (fn, resolve, ...args) => {
        queue.push(run.bind(null, fn, resolve, ...args));

        (async () => {
            // 微任务同步
            await Promise.resolve();
            if (activityNum < concurrentNum && queue.length > 0) {
                queue.shift()();
            }
        })();
    }

    function limiter(fn, ...args) {
        return new Promise(resolve => {
            enqueue(fn, resolve, ...args);
        });
    }

    Object.defineProperties(limiter, {
        activityNum: {
            get: () => activityNum
        },
        penddingNum: {
            get: () => queue.length
        },
        empty: {
            value: () => queue.length = 0
        }
    });

    return limiter;
}

const limit = pLimit(2);

function asyncFun(value, delay) {
    return new Promise((resolve) => {
        console.log('start ' + value);
        setTimeout(() => resolve(value), delay);
    });
}

(async function () {
    const arr = [
        limit(() => asyncFun('aaa', 2000)),
        limit(() => asyncFun('bbb', 3000)),
        limit(() => asyncFun('ccc', 1000)),
        limit(() => asyncFun('ccc', 1000)),
        limit(() => asyncFun('ccc', 1000))
    ];

    const result = await Promise.all(arr);
    console.log(result);
})();
