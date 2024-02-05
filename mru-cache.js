class MRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.accessOrder = [];
    }

    get(key) {
        if (this.cache.has(key)) {
            this.updateAccessOrder(key);
            return this.cache.get(key);
        }
        return -1;
    }

    put(key, value) {
        if (this.capacity === 0) return;

        if (this.cache.has(key)) {
            this.cache.set(key, value);
            this.updateAccessOrder(key);
        } else {
            if (this.cache.size >= this.capacity) {
                const mruKey = this.accessOrder.pop();
                this.cache.delete(mruKey);
            }
            this.cache.set(key, value);
            this.accessOrder.unshift(key);
        }
    }

    updateAccessOrder(key) {
        const index = this.accessOrder.indexOf(key);
        this.accessOrder.splice(index, 1);
        this.accessOrder.unshift(key);
    }
}

const mruCache = new MRUCache(3);

mruCache.put(1, "One");
mruCache.put(2, "Two");
mruCache.put(3, "Three");

console.log(mruCache.get(2));

mruCache.put(4, "Four");

console.log(mruCache.get(1));
