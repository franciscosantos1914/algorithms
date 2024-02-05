class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.frequencyMap = new Map();
        this.minHeap = new MinHeap();
    }

    get(key) {
        if (this.cache.has(key)) {
            const frequency = this.frequencyMap.get(key);
            this.frequencyMap.set(key, frequency + 1);

            this.minHeap.updateFrequency(key, frequency + 1);

            return this.cache.get(key);
        }

        return -1;
    }

    put(key, value) {
        if (this.capacity === 0) return;

        if (this.cache.has(key)) {
            const frequency = this.frequencyMap.get(key);
            this.frequencyMap.set(key, frequency + 1);
            this.cache.set(key, value);

            this.minHeap.updateFrequency(key, frequency + 1);
        } else {
            if (this.cache.size >= this.capacity) {
                const leastFrequentKey = this.minHeap.extractMin();
                this.cache.delete(leastFrequentKey);
                this.frequencyMap.delete(leastFrequentKey);
            }

            this.cache.set(key, value);
            this.frequencyMap.set(key, 1);

            this.minHeap.insert(key, 1);
        }
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(key, frequency) {
        this.heap.push({ key, frequency });
        this.heapifyUp(this.heap.length - 1);
    }

    extractMin() {
        const min = this.heap[0];
        const last = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.heapifyDown(0);
        }

        return min.key;
    }

    updateFrequency(key, newFrequency) {
        const index = this.findIndexByKey(key);

        if (index !== -1) {
            this.heap[index].frequency = newFrequency;

            if (newFrequency < this.heap[Math.floor((index - 1) / 2)].frequency) {
                this.heapifyUp(index);
            } else {
                this.heapifyDown(index);
            }
        }
    }

    findIndexByKey(key) {
        for (let i = 0; i < this.heap.length; i++) {
            if (this.heap[i].key === key) {
                return i;
            }
        }
        return -1;
    }

    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            if (this.heap[parentIndex].frequency > this.heap[index].frequency) {
                this.swap(parentIndex, index);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    heapifyDown(index) {
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;
        let smallest = index;

        if (leftChild < this.heap.length && this.heap[leftChild].frequency < this.heap[smallest].frequency) {
            smallest = leftChild;
        }

        if (rightChild < this.heap.length && this.heap[rightChild].frequency < this.heap[smallest].frequency) {
            smallest = rightChild;
        }

        if (smallest !== index) {
            this.swap(smallest, index);
            this.heapifyDown(smallest);
        }
    }

    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
}

const lfuCache = new LFUCache(3);

lfuCache.put(1, "One");
lfuCache.put(2, "Two");
lfuCache.put(3, "Three");

console.log(lfuCache.get(2));

lfuCache.put(4, "Four");

console.log(lfuCache.get(1));
