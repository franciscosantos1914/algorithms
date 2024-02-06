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
        // this.vertices[destination][source] = weight; // For undirected graph
    }

    aStar(startVertex, targetVertex, heuristic) {
        let closed = {};
        let cameFrom = {};
        let distances = {};
        let open = new PriorityQueue();

        for (let vertex in this.vertices) {
            distances[vertex] = Infinity;
        }
        distances[startVertex] = 0;
        open.enqueue(startVertex, 0);

        while (!open.isEmpty()) {
            let currentVertex = open.dequeue();

            if (currentVertex === targetVertex) {
                return this.reconstructPath(cameFrom, targetVertex);
            }

            closed[currentVertex] = true;

            for (let neighbor in this.vertices[currentVertex]) {
                if (closed[neighbor]) continue;

                let tentativeDistance = distances[currentVertex] + this.vertices[currentVertex][neighbor];
                if (tentativeDistance < distances[neighbor]) {
                    cameFrom[neighbor] = currentVertex;
                    distances[neighbor] = tentativeDistance;
                    let priority = tentativeDistance + heuristic(neighbor, targetVertex);
                    open.enqueue(neighbor, priority);
                }
            }
        }

        return null;
    }

    reconstructPath(cameFrom, currentVertex) {
        let path = [currentVertex];
        while (cameFrom[currentVertex] !== undefined) {
            currentVertex = cameFrom[currentVertex];
            path.unshift(currentVertex);
        }
        return path;
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

// Define heuristic function (Euclidean distance)
function heuristic(current, target) {
    const coordinates = {
        A: [0, 0],
        B: [1, 2],
        C: [3, 1],
        D: [5, 2],
        E: [4, 0]
    };

    const dx = coordinates[target][0] - coordinates[current][0];
    const dy = coordinates[target][1] - coordinates[current][1];
    return Math.sqrt(dx * dx + dy * dy);
}

const startVertex = "A";
const targetVertex = "E";
const shortestPath = graph.aStar(startVertex, targetVertex, heuristic);
console.log("Shortest path from", startVertex, "to", targetVertex, ":", shortestPath);
