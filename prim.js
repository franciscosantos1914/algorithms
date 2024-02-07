class Graph {
    constructor() {
        this.edges = new Map();
        this.vertices = new Set();
    }

    addEdge(vertex1, vertex2, weight) {
        this.vertices.add(vertex1);
        this.vertices.add(vertex2);

        if (!this.edges.has(vertex1)) {
            this.edges.set(vertex1, []);
        }
        if (!this.edges.has(vertex2)) {
            this.edges.set(vertex2, []);
        }

        this.edges.get(vertex1).push({ vertex: vertex2, weight });
        this.edges.get(vertex2).push({ vertex: vertex1, weight });
    }

    prim() {
        const priorityQueue = [];
        const minimumSpanningTree = [];
        const startingVertex = Array.from(this.vertices)[0];
        const visited = new Set([startingVertex]);

        this.edges.get(startingVertex).forEach(edge => {
            priorityQueue.push({ vertex: edge.vertex, weight: edge.weight });
        });

        while (priorityQueue.length > 0) {
            priorityQueue.sort((a, b) => a.weight - b.weight);
            const { vertex, weight } = priorityQueue.shift();

            if (!visited.has(vertex)) {
                visited.add(vertex);
                minimumSpanningTree.push({ source: vertex, destination: vertex, weight });

                this.edges.get(vertex).forEach(edge => {
                    if (!visited.has(edge.vertex)) {
                        priorityQueue.push({ vertex: edge.vertex, weight: edge.weight });
                    }
                });
            }
        }

        return minimumSpanningTree;
    }
}

const graph = new Graph();
graph.addEdge('A', 'B', 2);
graph.addEdge('A', 'C', 3);
graph.addEdge('B', 'C', 5);
graph.addEdge('B', 'D', 7);
graph.addEdge('C', 'D', 1);
graph.addEdge('C', 'E', 6);
graph.addEdge('D', 'E', 4);

const minimumSpanningTree = graph.prim();
console.log("Minimum Spanning Tree:");
console.log(minimumSpanningTree);
