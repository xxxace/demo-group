class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.header = null
        this.length = 0
    }

    append(data) {
        const node = new Node(data);

        if (this.length === 0) {
            this.header = node;
        } else {
            let current = this.header;

            while (current.next) {
                current = current.next;
            }

            current.next = node;
        }

        this.length += 1;
    }

    insert(position, data) {
        if (position < 0 || position > this.length) return false

        let current = this.header;
        const node = new Node(data);

        if (position === 0) {
            node.next = current;
            this.header = node;
        } else {
            let index = 0

            while (position !== ++index) {
                current = current.next;
            }

            node.next = current.next;
            current.next = node;
        }

        this.length += 1;

        return true;
    }

    toString() {
        let current = this.header
        let string = ''

        while (current) {
            string += current.data + ' '
            current = current.next
        }

        return string;
    }

    get(position) {
        if (this.isArrayBounds(position)) return undefined

        let index = 0
        let current = this.header
        while (position !== index++) {
            current = current.next;
        }

        return current.data;
    }

    indexOf(element) {
        let index = 0
        let current = this.header

        while (current && current.data !== element) {
            current = current.next
            index += 1
        }

        return index === this.length ? -1 : index
    }

    update(position, newValue) {
        if (this.isArrayBounds(position)) return false

        let index = 0
        let current = this.header

        while (position !== index++) {
            current = current.next
        }

        current.data = newValue
        return true
    }

    remove(element) {
        const index = this.indexOf(element);

        if (index !== -1) {
            return !!this.removeAt(index)
        } else {
            return false
        }
    }

    removeAt(position) {
        if (this.isArrayBounds(position)) return undefined

        let current = this.header

        if (position === 0) {
            this.header = current.next
            this.length -= 1
        } else {
            let index = 0

            while (position !== ++index) {
                current = current.next
            }

            current.next = current.next.next
            this.length -= 1
        }

        return current.data
    }

    isArrayBounds(index) {
        if (index < 0 || index >= this.length) return true
        return false
    }

    isEmpty() {
        return this.length === 0
    }

    size() {
        return this.length
    }
}

export default LinkedList