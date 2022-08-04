import Queue from "./Queue.js";

class PriorityElement {
    constructor(element, priority) {
        this.element = element
        this.priority = priority
    }
}

class PriorityQueue extends Queue {

    constructor() {
        super()
    }

    enqueue(item, priority) {
        const el = new PriorityElement(item, priority)
        if (!this.items.length || (!priority && priority !== 0)) {
            this.items.push(el);
        } else {
            let flag = false
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].priority > el.priority) {
                    flag = true
                    this.items.splice(i, 0, el)
                    break
                }
            }
            if (!flag) {
                this.items.push(el);
            }
        }
    }
}

export default PriorityQueue