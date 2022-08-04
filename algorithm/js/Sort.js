class Sort {
    constructor(arrayList = []) {
        if (!(arrayList instanceof Array)) return false
        this.arrayList = arrayList
    }

    push(arr = []) {
        this.arrayList.push(...arr)
    }

    swap(target, m, n) {
        const temp = target[m];
        target[m] = target[n];
        target[n] = temp;
    }

    bubble() {
        const length = this.arrayList.length
        if (!this.arrayList || !length) return this.arrayList
        const array = JSON.parse(JSON.stringify(this.arrayList))

        for (let i = length - 1; i > 0; i--) {
            for (let j = 0; j < i; j++) {
                if (array[j] > array[j + 1]) {
                    this.swap(array, j, j + 1);
                }
            }
        }

        return array;
    }

    selection() {
        const length = this.arrayList.length
        if (!this.arrayList || !length) return this.arrayList
        const array = JSON.parse(JSON.stringify(this.arrayList))

        for (let i = 0; i < length - 1; i++) {
            let min = i;

            for (let j = i + 1; j < length; j++) {
                if (array[min] > array[j]) {
                    min = j
                }
            }

            this.swap(array, min, i)
        }

        return array
    }

    insertion() {
        const length = this.arrayList.length
        if (!this.arrayList || !length) return this.arrayList
        const array = JSON.parse(JSON.stringify(this.arrayList))

        this.gap(array)

        return array
    }

    shell() {
        const length = this.arrayList.length
        if (!this.arrayList || !length) return this.arrayList
        const array = JSON.parse(JSON.stringify(this.arrayList))
        let gap = Math.floor(length / 2)

        while (gap > 0) {
            this.gap(array, gap)

            gap = Math.floor(gap / 2)
        }

        return array
    }


    quick() {
        const length = this.arrayList.length
        if (!this.arrayList || !length) return this.arrayList
        const array = JSON.parse(JSON.stringify(this.arrayList))
        this.quickSort(array, 0, array.length - 1)
        return array
    }

    quickSort(array, left, right) {
        if (left >= right) return

        // 枢纽
        const pivot = this.medium(array, left, right)

        let l = left
        let r = right - 1

        while (l < r) {
            // 左边找大的
            while (array[++l] < pivot) {}
            // 右边找小的
            while (array[--r] > pivot) {}
            if (l < r) {
                this.swap(array, l, r)
            } else {
                break
            }
        }

        this.swap(array, l, right - 1)

        this.quickSort(array, left, l - 1)
        this.quickSort(array, l + 1, right)
    }

    medium(array, left, right) {
        const center = Math.floor((left + right) / 2)

        if (array[left] > array[center]) {
            this.swap(array, left, center)
        }

        if (array[left] > array[right]) {
            this.swap(array, left, right)
        }

        if (array[center] > array[right]) {
            this.swap(array, center, right)
        }

        this.swap(array, center, right - 1)

        return array[right - 1]
    }

    gap(array, gap = 1) {
        const length = array.length

        for (let i = gap; i < length; i++) {
            let index = i
            let temp = array[i]

            while (index > (gap - 1) && array[index - gap] > temp) {
                array[index] = array[index - gap]
                index -= gap
            }

            array[index] = temp
        }
    }

    bucket() {
        const length = this.arrayList.length
        if (!this.arrayList || !length) return this.arrayList

        const bucket = []
        const array = JSON.parse(JSON.stringify(this.arrayList))

        for (let i = 0; i < array.length; i++) {
            const item = array[i]
            const index = Math.floor(item / 10)

            if (!bucket[index]) {
                bucket[index] = [item]
            } else {
                bucket[index].push(item)
            }
        }

        bucket.forEach(b => this.quickSort(b, 0, b.length - 1))

        return bucket
    }
}

export default Sort