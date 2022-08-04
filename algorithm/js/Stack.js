class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.lenth - 1];
    }

    size() {
        return this.items.length
    }

    isEmpty() {
        return this.items.length === 0
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
}

export default Stack