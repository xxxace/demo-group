// 原型链继承 缺点：和父类共用一个引用
(function () {
    console.log('---------------- 原型链继承 ----------------')
    function Parent() {
        this.list = [1, 2, 3]
    }

    function Child() { }
    Child.prototype = new Parent()

    let c1 = new Child()
    let c2 = new Child()
    c1.list.push(4)
    console.log(c1.list, c2.list) // 都是 [1,2,3,4]
})();

// 构造函数继承 缺点：无法继承原型方法
(function () {
    console.log('---------------- 构造函数继承 ----------------')
    function Parent() {
        this.list = [1, 2, 3]
    }

    Parent.prototype.getName = function () {
        return this.name
    }

    function Child() {
        Parent.call(this)
        this.name = 'child'
    }

    let c1 = new Child()
    let c2 = new Child()
    c1.list.push(4)
    try {
        console.log(c1.list, c2.list) // [1,2,3,4] [1,2,3]
        console.log(c1.getName()) // 报错
    } catch (e) { }
})();

// 组合式继承 结合了上两种方式 缺点：多次调用父类
(function () {
    console.log('---------------- 组合式继承 ----------------')
    function Parent() {
        console.log('parent call')
        this.list = [1, 2, 3]
    }

    Parent.prototype.getName = function () {
        return this.name
    }

    function Child(name) {
        Parent.call(this)
        this.name = name
    }

    Child.prototype = new Parent()
    Child.prototype.constructor = Child

    let c1 = new Child('c1')
    let c2 = new Child('c2')
    c1.list.push(4)
    console.log(c1.list, c2.list) // [1,2,3,4] [1,2,3]
    console.log(c1.getName(), c2.getName())
})();

// 原型式继承 缺点：和父类共用一个引用
(function () {
    console.log('---------------- 原型式继承 ----------------')
    const parent = {
        name: 'parent',
        list: [1, 2, 3],
        getName() {
            return this.name
        }
    }

    let c1 = Object.create(parent)
    c1.name = 'c1'
    let c2 = Object.create(parent)
    c2.name = 'c2'
    c1.list.push(4)
    console.log(c1.list, c2.list) // [1,2,3,4] [1,2,3,4]
    console.log(c1.getName(), c2.getName())
})();

// 寄生式继承 缺点：和父类共用一个引用
(function () {
    console.log('---------------- 寄生式继承 ----------------')
    const parent = {
        name: 'parent',
        list: [1, 2, 3],
        getName() {
            return this.name
        }
    }

    const clone = function (parentObject) {
        const obj = Object.create(parentObject)
        obj.getList = function () {
            return this.list
        }

        return obj
    }
    let c1 = clone(parent)
    c1.name = 'c1'
    c1.list.push(4)
    console.log(c1.list) // [1,2,3,4]
    console.log(c1.getName(), c1.getList())
})();

// 寄生组合式继承
(function () {
    console.log('---------------- 寄生式继承 ----------------')
    function Parent() {
        console.log('parent call')
        this.list = [1, 2, 3]
    }

    Parent.prototype.getName = function () {
        return this.name
    }

    function Child(name) {
        Parent.call(this)
        this.name = name
    }
    const extend = function (subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype)
        subClass.prototype.constructor = subClass
    }

    extend(Child, Parent)

    let c1 = new Child('c1')
    let c2 = new Child('c2')
    c1.name = 'c1'
    c1.list.push(4)
    console.log(c1.list, c2.list) // [1,2,3,4] [1,2,3]
    console.log(c1.getName(), c2.getName())
})();