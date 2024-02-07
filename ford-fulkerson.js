class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjacencyMatrix = Array.from(Array(vertices), () => new Array(vertices).fill(0));
    }

    addEdge(u, v, capacity) {
        this.adjacencyMatrix[u][v] = capacity;
    }

    bfs(source, target, parent) {
        let queue = [];
        let visited = new Array(this.vertices).fill(false);
        queue.push(source);
        parent[source] = -1;
        visited[source] = true;

        while (queue.length > 0) {
            let u = queue.shift();

            for (let v = 0; v < this.vertices; v++) {
                if (!visited[v] && this.adjacencyMatrix[u][v] > 0) {
                    queue.push(v);
                    parent[v] = u;
                    visited[v] = true;
                }
            }
        }

        return visited[target];
    }

    fordFulkerson(source, target) {
        let maxFlow = 0;
        let parent = new Array(this.vertices);

        while (this.bfs(source, target, parent)) {
            let pathFlow = Infinity;

            for (let v = target; v !== source; v = parent[v]) {
                let u = parent[v];
                pathFlow = Math.min(pathFlow, this.adjacencyMatrix[u][v]);
            }

            for (let v = target; v !== source; v = parent[v]) {
                let u = parent[v];
                this.adjacencyMatrix[u][v] -= pathFlow;
                this.adjacencyMatrix[v][u] += pathFlow;
            }

            maxFlow += pathFlow;
        }

        return maxFlow;
    }
}

const graph = new Graph(6);
graph.addEdge(0, 1, 16);
graph.addEdge(0, 2, 13);
graph.addEdge(1, 2, 10);
graph.addEdge(1, 3, 12);
graph.addEdge(2, 1, 4);
graph.addEdge(2, 4, 14);
graph.addEdge(3, 2, 9);
graph.addEdge(3, 5, 20);
graph.addEdge(4, 3, 7);
graph.addEdge(4, 5, 4);
const maxFlow = graph.fordFulkerson(0, 5);
console.log("Maximum Flow:", maxFlow);
