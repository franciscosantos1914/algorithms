class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.sort();
    }

    dequeue() {
        if (this.isEmpty()) return null;
        return this.queue.shift().element;
    }

    sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

class Graph {
    constructor() {
        this.vertices = {};
    }

    addVertex(vertex) {
        if (!this.vertices[vertex]) {
            this.vertices[vertex] = {};
        }
    }

    addEdge(source, destination, weight) {
        this.vertices[source][destination] = weight;
        //this.vertices[destination][source] = weight;
    }

    dijkstra(startVertex) {
        let distances = {};
        let visited = {};
        let priorityQueue = new PriorityQueue();

        for (let vertex in this.vertices) {
            distances[vertex] = Infinity;
            visited[vertex] = false;
        }
        distances[startVertex] = 0;
        priorityQueue.enqueue(startVertex, 0);

        while (!priorityQueue.isEmpty()) {
            let currentVertex = priorityQueue.dequeue();

            visited[currentVertex] = true;

            for (let neighbor in this.vertices[currentVertex]) {
                let distance = distances[currentVertex] + this.vertices[currentVertex][neighbor];
                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                    if (!visited[neighbor]) {
                        priorityQueue.enqueue(neighbor, distance);
                    }
                }
            }
        }

        return distances;
    }
}

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "C", 5);
graph.addEdge("B", "D", 10);
graph.addEdge("C", "D", 3);
graph.addEdge("C", "E", 7);
graph.addEdge("D", "E", 8);

const startVertex = "A";
const distances = graph.dijkstra(startVertex);
console.log("Shortest distances from vertex", startVertex, ":", distances);
