class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        return this.items.shift();
    }

    front() {
        return this.items[0];
    }

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    toString() {
        let string = '';
        for (let i = 0; i < this.items.length; i++) {
            string += this.items[i] + ' ';
        }
        return string;
    }

    reverse() {
        return this.items.reverse();
    }

    get length() {
        return this.size()
    }
}

export default Queue