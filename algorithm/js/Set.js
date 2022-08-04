class MySet {
    constructor(iterable) {
        this.Entries = []

        if (iterable) {
            const iterator = iterable[Symbol.iterator]();
            let next = iterator.next()

            while (!next.done) {
                this.add(next.value)
                next = iterator.next();
            }
        }
    }

    add(item) {
        let flag = false

        for (let i = 0; i < this.Entries.length; i++) {
            if (item === this.Entries[i]) {
                flag = true
                break
            }
        }

        if (!flag) {
            this.Entries.push(item)
        }
    }

    remove() {

    }

    keys() {
        return this.Entries
    }

    values() {
        return this.Entries
    }

    entries() {
        const entries = this.Entries.map(e => {
            return {
                key: e,
                value: e
            }
        })
        return entries
    }

    get[Symbol.toStringTag]() {
        return "MySet";
    }

    get['size']() {
        console.log(this.Entries)
        return this.Entries ? this.Entries.length || 0 : 0
    }

    static get[Symbol.species]() {
        return MySet;
    }
}

export default MySet