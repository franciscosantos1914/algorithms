class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.orderingList = new DoublyLinkedList();
    }

    get(key) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            this.orderingList.moveToFront(node);
            return node.value;
        }

        return -1;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            node.value = value;
            this.orderingList.moveToFront(node);
        } else {
            if (this.cache.size >= this.capacity) {
                const removedNode = this.orderingList.removeFromEnd();
                this.cache.delete(removedNode.key);
            }

            const newNode = new DoublyListNode(key, value);
            this.cache.set(key, newNode);
            this.orderingList.addToFront(newNode);
        }
    }
}

class DoublyListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = new DoublyListNode(null, null);
        this.tail = new DoublyListNode(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    addToFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    removeFromEnd() {
        const lastNode = this.tail.prev;
        this.removeNode(lastNode);
        return lastNode;
    }

    moveToFront(node) {
        this.removeNode(node);
        this.addToFront(node);
    }

    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}

const lruCache = new LRUCache(3);
lruCache.put(1, "One");
lruCache.put(2, "Two");
lruCache.put(3, "Three");

console.log(lruCache.get(1));

lruCache.put(4, "Four");

console.log(lruCache.get(2));
