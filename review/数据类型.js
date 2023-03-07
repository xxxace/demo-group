// undefined null number string boolean object symbol bigInt 8 种
// 基础数据类型 undefined null number string bigInt 在调用栈中
// 引用数据类型 object（Array,Date,RegExp）Function Symbol 在内存堆中

// 类型的判断
// instanceof 只能检测常规的引用类型 基本数据类型不行
// typeof 除了function 不能正确的识别引用类型
// Object.prototype.toString()可以识别一切
function getType(val) {
    const type = typeof val
    if (type !== 'object') {
        return type
    }

    return Object.prototype.toString.call(val).replace(/^\[object (\S+)\]$/, '$1')
}

function deepClone(val, map = new WeakMap()) {
    if (typeof val !== 'object' || val === null) {
        return val
    }

    if (map.has(val)) return map.get(val)

    // 日期
    if (val instanceof Date) {
        return new Date(val)
    }

    // 正则表达式
    if (val instanceof RegExp) {
        return new RegExp(val)
    }

    // Map
    if (val instanceof Map) {
        return new Map(val)
    }

    // Set
    if (val instanceof Set) {
        return new Set(val)
    }

    let clone = val instanceof Array ? [] : {}
    map.set(val, clone)

    // 对象或数组
    for (let key in val) {
        if (val.hasOwnProperty(key)) {
            clone[key] = deepClone(val[key], map)
        }
    }

    return clone
}