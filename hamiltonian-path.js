class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjacencyMatrix = Array.from(Array(vertices), () => new Array(vertices).fill(0));
    }

    addEdge(u, v) {
        this.adjacencyMatrix[u][v] = 1;
        this.adjacencyMatrix[v][u] = 1;
    }

    hamiltonianPath() {
        let path = [];
        let visited = new Array(this.vertices).fill(false);

        const isHamiltonian = (vertex, pos) => {
            if (pos === this.vertices) return true;

            for (let v = 0; v < this.vertices; v++) {
                if (this.adjacencyMatrix[vertex][v] === 1 && !visited[v]) {
                    visited[v] = true;
                    path[pos] = v;

                    if (isHamiltonian(v, pos + 1)) {
                        return true;
                    }

                    visited[v] = false;
                    path[pos] = -1;
                }
            }

            return false;
        };

        for (let i = 0; i < this.vertices; i++) {
            path.fill(-1);
            visited.fill(false);

            path[0] = i;
            visited[i] = true;

            if (isHamiltonian(i, 1)) {
                return path;
            }
        }

        return [];
    }
}

const graph = new Graph(5);
graph.addEdge(0, 1);
graph.addEdge(1, 2);
graph.addEdge(2, 3);
graph.addEdge(3, 4);
graph.addEdge(4, 0);

const hamiltonianPath = graph.hamiltonianPath();
if (hamiltonianPath.length > 0) {
    console.log("Hamiltonian Path:", hamiltonianPath.join(" -> "));
} else {
    console.log("No Hamiltonian Path found.");
}
