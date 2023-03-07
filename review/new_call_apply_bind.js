function $new(constructor, ...args) {
    if (typeof constructor !== 'function') {
        throw TypeError('constructor must be a function')
    }

    const instance = new Object()
    instance.__proto__ = Object.create(constructor.prototype)

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
