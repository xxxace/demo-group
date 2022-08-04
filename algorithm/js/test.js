import BinarySearchTree from './BinarySearchTree.js';
import Graph from './Graph.js';
import HashTable from './HashTable.js';
import LinkedList from './LinkedList.js';
import DoubleLinkedList from './DoubleLinkedList.js';
import PriorityQueue from './PriorityQueue.js';
import Stack from './Stack.js';
import MySet from './Set.js';
import Sort from './Sort.js';

const graph = new Graph()
const vList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

vList.forEach(v => graph.addVertex(v))

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')

graph.addEdge('B', 'E')
graph.addEdge('B', 'F')

graph.addEdge('E', 'I')

graph.addEdge('C', 'D')
graph.addEdge('C', 'G')

graph.addEdge('D', 'G')
graph.addEdge('D', 'H')

console.log(graph.toString())

let bfsStr = ''
graph.bfs((v) => {
    bfsStr += v + ' '
})

console.log(bfsStr)

let dfsStr = ''
graph.dfs((v) => {
    dfsStr += v + ' '
})

console.log(dfsStr)

const hashTable = new HashTable(3);

hashTable.put('ace', {
    name: 'ace',
    age: 999
})

hashTable.put('acex', {
    name: 'acex',
    age: 888
})

hashTable.put('acexx', {
    name: 'acexx',
    age: 777
})

hashTable.put('acexx', {
    name: 'acexx',
    age: 666
})


hashTable.put('acexxx', {
    name: 'acexxx',
    age: 555
})
hashTable.put('acexx1', {
    name: 'acexx1',
    age: 444
})
hashTable.put('acexx2', {
    name: 'acexx2',
    age: 333
})
hashTable.put('acexx3', {
    name: 'acexx3',
    age: 222
})
hashTable.put('acexx4', {
    name: 'acexx4',
    age: 111
})
hashTable.put('acexx5', {
    name: 'acexx5',
    age: 6661
})
console.log(hashTable)
console.log(hashTable.get('ace'))
hashTable.remove('acexx')
    // hashTable.remove('acex')
    // hashTable.remove('acexx1')
    // hashTable.remove('acexx2')
    // hashTable.remove('acexx3')
    // hashTable.remove('acexx4')
    // hashTable.remove('acexx5')
    // hashTable.remove('acexxx')
console.log(hashTable.get('acexx'))


const list = new LinkedList();

list.append('ace');
list.append('is');
list.append('dope');
list.append('!');
list.append('!');
list.append('!');

list.insert(0, 'hi,');
list.insert(3, 'very');

console.log('toString:', list.toString());

console.log('indexOf:', list.indexOf(list.get(0)), list.indexOf('axexxx'))

console.log('update:', list.update(0, 'The'))
console.log('update:', list.update(9, 'The'))

console.log('remove:', list.remove(list.get(7)), list.remove(list.get(8)))
console.log('removeAt:', list.removeAt(6), list.removeAt(9))

console.log('get:', list.get(0), list.get(1), list.get(2), list.get(3), list.get(4), list.get(5), list.get(6), list.get(7), list.get(8))


const dblist = new DoubleLinkedList();

dblist.append("ace")
dblist.append("acex")
dblist.append("acexx")
dblist.append("acexxx")
dblist.append("acexxxx")

dblist.insert(0, "ace_x")
dblist.insert(3, "ace_xxx")
dblist.insert(dblist.length - 1, "ace_xxxxxxx")

dblist.update(dblist.length - 1, "endpoint")
dblist.update(0, "startpoint")
dblist.update(3, "middlepoint")

console.log(dblist.indexOf('middlepoint'), dblist.indexOf('endpoint'), dblist.indexOf('unkonwnpoint'), dblist.length - 1)
console.log(dblist.get(0), dblist.get(3), dblist.get(dblist.length - 1), dblist.get(dblist.length))
console.log(dblist.getItem(0), dblist.getItem(3), dblist.getItem(dblist.length - 1), dblist.getItem(dblist.length))

dblist.append("xace")
dblist.append("xxace")
console.log(dblist, dblist.toString())
console.log(dblist.remove('xxace'), dblist.remove('xxacex'))

console.log(dblist.removeAt(dblist.indexOf('xace')), dblist.removeAt(100))
console.log(dblist, dblist.toString())



const pQueue = new PriorityQueue();
pQueue.enqueue('acex', 1)
pQueue.enqueue('ace', 0)
pQueue.enqueue('acexxx', 9)
pQueue.enqueue('acexxxx', 9)
pQueue.enqueue('acexxxxxxx', 8)
pQueue.enqueue('acexxxxxxx')

console.log(pQueue.items)
pQueue.enqueue('a_ce', 0)
pQueue.enqueue('a_cex', -1)


function dec2Bin(decNum) {
    const stack = new Stack();

    while (decNum > 0) {
        stack.push(decNum % 2);
        decNum = Math.floor(decNum / 2);
    }

    return stack.reverse().join('');
}

console.log(dec2Bin(100)); // 1100100

const a = {
    a: 2
}
const set = new Set([a, a, 3, 4, 5, 6, 1])
const mySet = new MySet([1, 2, 2, 3, 3, 4, 4, 5, 6, 1])

mySet.add(1)
mySet.add(7)
mySet.add(1)
mySet.add(8)
mySet.keys()
mySet.values()
console.log(mySet, set.delete(a), set, mySet.entries(), mySet.values())



const bst = new BinarySearchTree();
bst.insert(11)
bst.insert(7)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(5)
bst.insert(3)
bst.insert(15)
bst.insert(13)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(19)
bst.insert(21)

bst.remove(11)
bst.remove(7)
bst.remove(9)
bst.remove(8)
bst.remove(10)
bst.remove(3)
bst.remove(5)
bst.remove(15)
bst.remove(13)
bst.remove(14)
bst.remove(20)
bst.remove(18)
bst.remove(19)
bst.remove(21)

let str = ''
bst.middleTraversal((key) => {
    str += key + ' '
})
console.log(str, bst.count)
console.log(bst.getMax(), bst.getMin(), bst)

const base = [9, 4, 10, 1, 3, 6, 7, 5, 8, 2, 13, 11, 16, 14, 15, 17, 20, 21, 19, 18, 156, 115, 157, 138, 354, 483, 4384, 6464, 6468, 6469]
const sort = new Sort(base);
for (let i = 1; i < 100; i++) {
    sort.push([9, 4, 10, 1, 3, 6, 7, 5, 8, 2, 13, 11, 16, 14, 15, 17, 20, 21, 19, 18, 156, 115, 157, 138, 354, 483, 4384, 6464, 6468, 6469])
}
console.log('origin:', sort.arrayList)
console.log('bubble:', useTime(() => sort.bubble()))
console.log('selection:', useTime(() => sort.selection()))
console.log('insertion:', useTime(() => sort.insertion()))
console.log('shell:', useTime(() => sort.shell()))
console.log('quick:', useTime(() => sort.quick()))
console.log('bucket:', useTime(() => sort.bucket()))

function useTime(fn) {
    console.time()
    const result = fn()
    console.timeEnd()
    return result
}

function Random() {
    const random = Math.floor(Math.random() * 3)
    console.log(random)
}

const r_button = document.querySelector('#random')

r_button.addEventListener('click', Random)