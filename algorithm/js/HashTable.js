function isPrime(num) {
    if (num < 2) return false

    const sqrt = parseInt(Math.sqrt(num))
    for (let i = 2; i <= sqrt; i++) {
        if (num % i === 0) {
            return false
        }
    }

    return true
}

function getPrime(num) {
    while (!isPrime(num)) {
        num++
    }

    return num
}

function hashFunc(str, size) {
    let hashCode = 0

    // 秦九韶算法 霍纳法则
    for (let i = 0; i < str.length; i++) {
        hashCode += 37 * i + str.charCodeAt(i)
    }

    let index = hashCode % size

    return index
}

class HashTable {

    constructor(limit = 7) {
        this.table = []
        this.count = 0
        this.limit = limit
    }

    put(key, value) {
        let index = hashFunc(key, this.limit)
        let bucket = this.table[index]

        if (!bucket) {
            bucket = []
            this.table[index] = bucket
        }

        for (let i = 0; i < bucket.length; i++) {
            if (key === bucket[i][0]) {
                bucket[i][1] = value
                return
            }
        }

        bucket.push([key, value])
        this.count++;
        // 扩容
        if (this.count > this.limit * 0.75) {
            let newSize = getPrime(this.limit * 2)
            this.resize(newSize)
        }
        return
    }

    get(key) {
        const index = hashFunc(key, this.limit)
        const bucket = this.table[index]

        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (key === bucket[i][0]) {
                    return bucket[i][1]
                }
            }
        }
        return null
    }

    remove(key) {
        const index = hashFunc(key, this.limit)
        const bucket = this.table[index]

        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (key === bucket[i][0]) {
                    const result = bucket[i][1]
                    bucket.splice(i, 1)
                    this.count--;
                    // 缩容
                    if (this.count > 7 && this.count < this.limit * 0.5) {
                        let newSize = getPrime(Math.floor(this.limit / 2))
                        this.resize(newSize)
                    }
                    return result
                }
            }
        }

        return false
    }

    resize(newLimit) {
        let oldTable = this.table

        this.count = 0
        this.table = []
        this.limit = newLimit

        for (let i = 0; i < oldTable.length; i++) {
            const bucket = oldTable[i]
            if (!bucket) continue
            for (let j = 0; j < bucket.length; j++) {
                const tuple = bucket[j]
                this.put(tuple[0], tuple[1])
            }
        }
    }
}

export default HashTable