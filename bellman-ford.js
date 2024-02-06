class Edge {
    constructor(source, destination, weight) {
        this.source = source;
        this.weight = weight;
        this.destination = destination;
    }
}

class Graph {
    constructor(vertices, edges) {
        this.edges = edges;
        this.vertices = vertices;
    }

    addEdge(source, destination, weight) {
        this.edges.push(new Edge(source, destination, weight));
    }

    bellmanFord(startVertex) {
        let distance = {};
        let predecessor = {};

        this.vertices.forEach(vertex => {
            distance[vertex] = Infinity;
            predecessor[vertex] = null;
        });
        distance[startVertex] = 0;

        for (let i = 0; i < this.vertices.length - 1; i++) {
            this.edges.forEach(edge => {
                let { source, destination, weight } = edge;
                if (distance[source] + weight < distance[destination]) {
                    distance[destination] = distance[source] + weight;
                    predecessor[destination] = source;
                }
            });
        }

        this.edges.forEach(edge => {
            let { source, destination, weight } = edge;
            if (distance[source] + weight < distance[destination]) {
                throw new Error("Graph contains a negative weight cycle");
            }
        });

        return { distance, predecessor };
    }

    printShortestPath(startVertex, endVertex, predecessor) {
        let path = [];
        let currentVertex = endVertex;
        while (currentVertex !== startVertex) {
            path.unshift(currentVertex);
            currentVertex = predecessor[currentVertex];
        }
        path.unshift(startVertex);
        console.log("Shortest Path:", path.join(" -> "));
    }
}

const graph = new Graph(["A", "B", "C", "D", "E"], []);

graph.addEdge("A", "B", 6);
graph.addEdge("A", "D", 1);
graph.addEdge("B", "C", 5);
graph.addEdge("B", "D", 2);
graph.addEdge("D", "B", 2);
graph.addEdge("D", "E", 1);
graph.addEdge("E", "B", -1);
graph.addEdge("E", "C", 5);

const startVertex = "A";
const { distance, predecessor } = graph.bellmanFord(startVertex);
console.log("Distance:", distance);
console.log("Predecessor:", predecessor);
graph.printShortestPath(startVertex, "C", predecessor);
