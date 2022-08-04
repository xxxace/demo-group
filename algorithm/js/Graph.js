import Dictionary from "./Dictionary.js"
import Queue from "./Queue.js"
class Graph {
    constructor() {
        this.vertexes = []
        this.edge = new Dictionary()
        this.colors = new Dictionary()
    }

    // 添加顶点
    addVertex(vertex) {
        this.vertexes.push(vertex)
        this.edge.set(vertex, [])
        this.colors.set(vertex, 'white')
    }

    // 添加边
    addEdge(v1, v2) {
        this.edge.get(v1).push(v2)
        this.edge.get(v2).push(v1)
    }

    // 状态初始化
    initializeColor() {
        this.vertexes.forEach(vertex => this.colors.set(vertex, 'white'))
    }

    // 广度优先搜索(Breadth First Search)
    bfs(handler) {
        if (!this.vertexes.length) return false

        try {
            const vQueue = new Queue()
            let v = this.vertexes[0]

            this.initializeColor()
            vQueue.enqueue(v)

            while (v = vQueue.dequeue()) {
                this.colors.set(v, 'gray')

                handler(v)

                const eList = this.edge.get(v)

                if (eList && eList.length) {
                    for (let i = 0; i < eList.length; i++) {
                        const e = eList[i]
                        if (this.colors.get(e) === 'white') {
                            this.colors.set(e, 'gray')
                            vQueue.enqueue(e)
                        }
                    }
                }

                this.colors.set(v, 'black')
            }

            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    // 深度优先搜索(Depth First Search)
    dfs(handler) {
        if (!this.vertexes.length) return false
        try {
            let v = this.vertexes[0]

            this.initializeColor()
            this.walkEdge(v, handler)

            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    // 遍历边
    walkEdge(v, handler) {
        this.colors.set(v, 'gray')

        const eList = this.edge.get(v)

        handler(v)

        if (eList && eList.length) {
            for (let i = 0; i < eList.length; i++) {
                const e = eList[i]
                if (this.colors.get(e) === 'white') {
                    this.walkEdge(e, handler)
                }
            }
        }

        this.colors.set(v, 'black')
    }

    toString() {
        let string = ''
        for (let i = 0; i < this.vertexes.length; i++) {
            const vertex = this.vertexes[i]
            string += `${vertex} -> `
            const eList = this.edge.get(vertex)
            for (let j = 0; j < eList.length; j++) {
                string += `${eList[j]} `
            }

            string += '\n'
        }

        return string;
    }
}

export default Graph