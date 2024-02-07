class UnionFind {
    constructor(size) {
        this.rank = new Array(size);
        this.parent = new Array(size);

        for (let i = 0; i < size; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);

        if (rootX === rootY) return;

        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
    }
}

class Graph {
    constructor(vertices, edges) {
        this.edges = edges;
        this.vertices = vertices;
    }

    addEdge(source, destination, weight) {
        this.edges.push({ source, destination, weight });
    }

    kruskal() {
        let minimumSpanningTree = [];
        let unionFind = new UnionFind(this.vertices);

        this.edges.sort((a, b) => a.weight - b.weight);

        this.edges.forEach(edge => {
            let { source, destination, weight } = edge;
            if (unionFind.find(source) !== unionFind.find(destination)) {
                minimumSpanningTree.push(edge);
                unionFind.union(source, destination);
            }
        });

        return minimumSpanningTree;
    }
}
const graph = new Graph(4, []);
graph.addEdge(0, 1, 2);
graph.addEdge(0, 3, 6);
graph.addEdge(1, 2, 3);
graph.addEdge(1, 3, 8);
graph.addEdge(1, 4, 5);
graph.addEdge(2, 4, 7);
graph.addEdge(3, 4, 9);

const minimumSpanningTree = graph.kruskal();
console.log("Minimum Spanning Tree:");
minimumSpanningTree.forEach(edge => {
    console.log(`${edge.source} - ${edge.destination} : ${edge.weight}`);
});
