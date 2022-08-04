class Node {
    constructor(data) {
        this.data = data
        this.prev = null
        this.next = null
    }
}

class DoubleLinkedList {
    constructor() {
        this.header = null
        this.tail = null
        this.length = 0
    }

    append(data) {
        const node = new Node(data);

        if (!this.header) {
            this.header = node;
            this.tail = node
        } else {
            node.prev = this.tail
            this.tail.next = node
            this.tail = node
        }

        this.length += 1
    }

    insert(position, element) {
        if (position < 0 || position > this.length - 1) return false

        const node = new Node(element)

        if (position === 0) {
            if (this.header) {
                this.header.prev = node
                node.next = this.header
                this.header = node
            } else {
                this.header = node
                this.tail = node
            }

        } else if (position === this.length) {
            node.prev = this.tail
            this.tail.next = node
            this.tail = node

        } else if (position === this.length - 1) {
            node.prev = this.tail.prev
            node.next = this.tail
            this.tail.prev.next = node
            this.tail.prev = node

        } else {
            let index = 0
            let current = this.header

            while (current.next && position !== index++) {
                current = current.next
            }

            node.prev = current.prev
            node.next = current
            current.prev.next = node
        }

        this.length += 1
        return true
    }

    update(position, element) {
        if (position < 0 || position >= this.length) return false

        let current = this.header

        if (position === this.length - 1) {
            this.tail.data = element
        } else {
            let index = 0

            while (current && position !== index++) {
                current = current.next
            }
            current.data = element
        }

        return true;
    }

    indexOf(element) {
        let index = 0
        let current = this.header

        while (current && current.data !== element) {
            current = current.next
            index += 1
        }
        return index >= this.length ? -1 : index
    }

    get(positon) {
        if (positon < 0 || positon >= this.length) return undefined

        if (positon === this.length - 1) {
            return this.tail
        }

        let index = 0
        let current = this.header

        while (positon !== index++) {
            current = current.next
        }

        return current
    }

    getItem(positon) {
        const result = this.get(positon)
        return result ? result.data : result
    }

    remove(element) {
        const index = this.indexOf(element);
        if (index !== -1) {
            return !!this.removeAt(index);
        }
        return false
    }

    removeAt(position) {
        if (typeof position !== "number" || position < 0 || position >= this.length) return undefined

        let current = this.header

        if (position === 0) {
            this.header = current.next
            if (!this.header) {
                this.tail = null
            } else if (this.tail.prev === this.header) {
                this.tail = this.header
            }
        } else if (position === this.length - 1) {
            current = this.tail
            this.tail.prev.next = null
            this.tail = this.tail.prev
        } else {
            let index = 0

            while (position !== index++) {
                current = current.next
            }

            current.prev.next = current.next
            current.next.prev = current.prev
        }

        this.length -= 1

        return current.data
    }

    toString() {
        let string = ''
        let current = this.header

        while (current) {
            string += current.data + ' '
            current = current.next
        }

        return string
    }
}

export default DoubleLinkedList