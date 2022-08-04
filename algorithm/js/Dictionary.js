class Dictionary {
    item = null

    constructor() {
        this.empty()
    }

    set(key, value) {
        this.item[key] = value
    }

    get(key) {
        return this.isEmpty() ? null : this.item[key]
    }

    empty() {
        this.item = {}
    }

    isEmpty() {
        return !this.item
    }

    has(key) {
        return tthis.isEmpty() ? false : this.item.hasOwnProperty(key)
    }
}

export default Dictionary