function $new(constructor, ...args) {
    if (typeof constructor !== 'function') {
        throw TypeError('constructor must be a function')
    }
    // 创建一个空对象
    const instance = new Object()
    // 将原型指向实例的__proto__
    instance.__proto__ = Object.create(constructor.prototype)
    // 初始化
    const result = constructor.apply(instance, args)

    return result && (typeof result === 'object' || typeof result === 'function') ? result : instance
}

function Car(name, color) {
    this.name = name
    this.color = color
    this.doors = [1, 2, 3, 4]
}

Car.prototype.wheels = [1, 2, 3, 4]

Car.prototype.setPrice = function (price) {
    this.price = price
}

Car.prototype.setProductionDate = function (date) {
    this.productionDate = date
}

const wlhg = $new(Car, '五菱宏光', '银色')
wlhg.setPrice(50000)
wlhg.setProductionDate(new Date())
wlhg.doors.push(...[5, 6])
wlhg.wheels.push(...[5, 6])
console.log(wlhg, wlhg.wheels)

const lbjn = $new(Car, '兰博基尼', '钛空银')
lbjn.setPrice(8000000)
lbjn.setProductionDate(new Date())
console.log(lbjn, lbjn.wheels)

function $call() {
    const fn = arguments[0]
    const context = arguments[1] || window
    const args = Array.prototype.splice.call(arguments, 2)
    let code = 'context.fn('

    for (let i = 0; i < args.length; i++) {
        code += 'args[' + i + ']'
        if (i !== args.length - 1) code += ','
    }

    code += ')'
    context.fn = fn
    const result = eval(code)
    delete context.fn

    return result;
}
const arrayLike = { 0: 'a', 1: 'b', length: 2 }
console.log($call(Object.prototype.toString, []))
$call(Array.prototype.push, arrayLike, 'c', 'd', 'e')
console.log(arrayLike)

function $apply() {
    const fn = arguments[0]
    const context = arguments[1] || window
    const args = arguments[2] || []
    let code = 'context.fn('

    for (let i = 0; i < args.length; i++) {
        code += 'args[' + i + ']'
        if (i !== args.length - 1) code += ','
    }

    code += ')'
    context.fn = fn
    const result = eval(code)
    delete context.fn

    return result;
}

$apply(Array.prototype.push, arrayLike, ['f', 'g', 'h'])
console.log(arrayLike)

function $bind() {
    const fn = arguments[0]
    const context = arguments[1] || window
    const presetArgs = Array.prototype.splice.call(arguments, 2)

    function bind() {
        const args = presetArgs.concat(Array.prototype.splice.call(arguments, 0))
        return $apply(fn, context, args);
    }

    if (context.prototype) bind.prototype = Object.create(context.prototype)

    return bind
}

const push = $bind(Array.prototype.push, arrayLike, ['x', 'x'])
push('xx', 'xx')
push('22', '22')
console.log(arrayLike)

function flatten(array) {
    let res = []

    for (let i = 0; i < array.length; i++) {
        const item = array[i]
        if (item instanceof Array) res = res.concat(flatten(item))
        else res.push(item)
    }

    return res
}

// 精简了 但返回的都是文本
function flatten2(array) {
    return array.toString().split(',')
}

console.log(flatten([1, 2, 3, [4, [5, [6, [7, [8]]]]]]))
console.log(flatten2([1, 2, 3, [4, [5, [6, [7, [8]]]]]]))

function $push() {
    let O = Object(arguments[0])
    const args = Array.prototype.splice.call(arguments, 1)
    let len = O.length >>> 0
    let argCount = args.length >>> 0

    if (len + argCount > 2 ** 53 - 1) {
        throw Error('超过数组最大长度')
    }

    for (let i = 0; i < argCount; i++) {
        O[len + i] = args[i]
    }

    let newLength = len + argCount
    O.length = newLength
    return newLength
}
const array = [1, 2, 3]
console.log($push(array, 4, 5, 6), array.length)

const stack = [1, 2, 3, 4, 5]
function work() {
    const item = stack.shift()
    if (item) {
        console.log('item:' + item)
        nexttick()
    } else {
        console.log('work done')
    }
    console.log('outter')
}

function nexttick() {
    if (stack.length) {
        process.nextTick(work)
    } else {
        console.log('nexttick done')
    }
}

work()