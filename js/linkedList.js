class ListNode {
    constructor(val, next) {
        this.val = val
        this.next = next || null
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }

    add(val) {
        const node = new ListNode(val)

        if (!this.head && !this.tail) {
            this.head = this.tail = node
        } else {
            this.tail.next = node
            this.tail = node
        }
    }

    toString() {
        let str = ''
        let node = this.head

        while (node) {
            str += node.val
            if (node.next) str += '->'
            node = node.next
        }

        return str
    }
}

function mergeList(l1, l2) {
    if (l1 === null) {
        return l2
    }

    if (l2 === null) {
        return l1
    }

    let list1, list2
    if (l1.head) {
        list1 = l1
        l1 = l1.head
    }

    if (l2.head) {
        list2 = l2
        l2 = l2.head
    }

    if (l1.val < l2.val) {
        l1.next = mergeListByNode(l1.next, l2)
        return list1
    } else {
        l2.next = mergeListByNode(l1, l2.next)
        return list2
    }
}

function mergeListByNode(l1, l2) {
    if (l1 === null) {
        return l2
    }

    if (l2 === null) {
        return l1
    }

    if (l1.val < l2.val) {
        l1.next = mergeListByNode(l1.next, l2)
        return l1
    } else {
        l2.next = mergeListByNode(l1, l2.next)
        return l2
    }
}

function mergeListV2(l1, l2) {
    const prev = new LinkedList()

    while (l1 !== null && l2 !== null) {
        if (l1.val < l2.val) {
            prev.add(l1.val)
            l1 = l1.next
        } else {
            prev.add(l2.val)
            l2 = l2.next
        }
    }

    prev.add(l1 === null ? l2.val : l1.val)

    return prev
}

const list = new LinkedList()
list.add(1)
list.add(2)
list.add(4)

const list2 = new LinkedList()
list2.add(1)
list2.add(3)
list2.add(4)
console.log(list.toString(), list2.toString())

const list3 = mergeList(list, list2)
console.log(list3.toString())

const list4 = new LinkedList()
list4.add(1)
list4.add(2)
list4.add(4)

const list5 = new LinkedList()
list5.add(1)
list5.add(3)
list5.add(4)
const list6 = mergeListV2(list4.head, list5.head)
list6.add('ace')
list6.add('is')
list6.add('cool')
console.log(list4.toString(), list5.toString(), list6.toString())