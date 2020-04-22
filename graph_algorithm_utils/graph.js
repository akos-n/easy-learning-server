let Color = require('./algorithm_utils').Color;

class Edge {
    constructor(fromVertex, toVertex, weight = 0)
    {
        this.fromVertex = fromVertex;
        this.toVertex = toVertex;
        this.weight = weight;
    }
}

class Vertex {
    constructor(parent = null,
                color = Color.WHITE,
                depth = Infinity,
                cost = Infinity,
                distance = Infinity,
                discoveryTime = 0,
                finishingTime = 0) {
        this.depth = depth;
        this.parent = parent;
        this.color = color;
        this.cost = cost;
        this.distance = distance;
        this.discoveryTime = discoveryTime;
        this.finishingTime = finishingTime;
    }
}

class Graph {
    constructor(directed = false)
    {
        this.noOfVertices = 0;
        this.directed = directed;
        this.adjList = new Map();
    }

    addVertex(v)
    {
        this.noOfVertices++;
        this.adjList.set(v, []);
    }

    removeVertex(v)
    {
        this.noOfVertices--;
        this.adjList.delete(v);
    }

    addEdge(src, dest, weight = 0)
    {
        this.adjList.get(src).push(new Edge(src, dest, weight));

        if (!this.directed)
            this.adjList.get(dest).push(new Edge(dest, src, weight));
    }

    getNoOfVertices()
    {
        return this.noOfVertices;
    }

    getAdjList()
    {
        return this.adjList;
    }

    setDirected(directed)
    {
        this.directed = directed;
    }
}

exports.Edge = Edge;
exports.Vertex = Vertex;
exports.Graph = Graph;
