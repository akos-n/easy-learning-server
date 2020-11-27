let utils = require("./algorithm_utils");
let Vertex = require("./graph").Vertex;
let copy = utils.copy,
  Color = utils.Color,
  Stack = utils.Stack,
  Queue = utils.Queue,
  PriorityQueue = utils.PriorityQueue;

const AlgorithmType = {
  BFS: "Breadth-First Search",
  DFS: "Depth-First Search",
  TOPO: "Topological order",
  TOPO_DFS: "Topological order with Depth-First Search",
  KRUSKAL: "Kruskal algorithm for minimum-spanning-tree",
  PRIM: "Prim's algorithm for minimum-spanning-tree",
  DIJKSTRA: "Dijkstra's Shortest Path First algorithm",
  QBBF: "Queue-based Bellman-Ford algorithm (shortest path)",
  FW: "Floyd-Warshall algorithm (shortest path)",
};

function getDescriptionForAlgorithmType(algorithmType) {
  switch (algorithmType) {
    case AlgorithmType.BFS:
      return require("../graph-jsons/BFS.json");
    case AlgorithmType.DFS:
      return require("../graph-jsons/DFS.json");
    case AlgorithmType.TOPO:
      return require("../graph-jsons/TOPO.json");
    case AlgorithmType.TOPO_DFS:
      return require("../graph-jsons/TOPO-DFS.json");
    case AlgorithmType.KRUSKAL:
      return require("../graph-jsons/KRUSKAL.json");
    case AlgorithmType.PRIM:
      return require("../graph-jsons/PRIM.json");
    case AlgorithmType.DIJKSTRA:
      return require("../graph-jsons/DIJKSTRA.json");
    case AlgorithmType.QBBF:
      return require("../graph-jsons/QBBF.json");
    case AlgorithmType.FW:
      return require("../graph-jsons/FW.json");
    default:
      throw new Error("Algorithm's JSON file was not found.");
  }
}

class AlgorithmSteps {
  constructor(algorithmType) {
    const algorithmJSON = getDescriptionForAlgorithmType(algorithmType);
    this.algorithmType = algorithmJSON.name;
    this.algorithmDescription = algorithmJSON.description;
    this.currentStepIndex = 0;
    this.steps = [];
  }

  addStep(step) {
    this.steps.push(step);
  }
}

class Step {
  constructor({
    vertices = null,
    stack = null,
    queue = null,
    topologicalOrder = null,
    inDegrees = null,
    sortedEdges = null,
    chosenEdges = null,
    kruskalSets = null,
    step = null,
    round = null,
    currentVertex = null,
    distanceMatrix = null,
    parentMatrix = null,
    k = null,
    i = null,
    j = null,
  }) {
    this.vertices = copy(vertices);
    this.stack = copy(stack);
    this.queue = copy(queue);
    this.topologicalOrder = copy(topologicalOrder);
    this.inDegrees = copy(inDegrees);
    this.sortedEdges = copy(sortedEdges);
    this.chosenEdges = copy(chosenEdges);
    this.kruskalSets = copy(kruskalSets);
    this.step = copy(step);
    this.round = copy(round);
    this.currentVertex = copy(currentVertex);
    this.distanceMatrix = copy(distanceMatrix);
    this.parentMatrix = copy(parentMatrix);
    this.k = copy(k);
    this.i = copy(i);
    this.j = copy(j);
  }
}

function randInt(to, from = 0) {
  return Math.floor(Math.random() * to) + from;
}

function dfsVisit(
  graph,
  indexOfCurrentVertex,
  vertices,
  time,
  algorithmSteps,
  chosenEdges
) {
  time.push(0);
  vertices[indexOfCurrentVertex].discoveryTime = time.length;
  vertices[indexOfCurrentVertex].color = Color.LIGHT_BLUE;
  algorithmSteps.addStep(
    new Step({ vertices: vertices, chosenEdges: chosenEdges })
  );
  for (let i = 0; i < graph.adjList.get(indexOfCurrentVertex).length; ++i) {
    if (
      vertices[graph.adjList.get(indexOfCurrentVertex)[i].toVertex].color ===
      Color.WHITE
    ) {
      chosenEdges.push(copy(graph.adjList.get(indexOfCurrentVertex)[i]));
      chosenEdges[chosenEdges.length - 1].color = Color.DARK_RED;
      vertices[
        graph.adjList.get(indexOfCurrentVertex)[i].toVertex
      ].parent = indexOfCurrentVertex;
      dfsVisit(
        graph,
        graph.adjList.get(indexOfCurrentVertex)[i].toVertex,
        vertices,
        time,
        algorithmSteps,
        chosenEdges
      );
    } else if (
      vertices[graph.adjList.get(indexOfCurrentVertex)[i].toVertex].color ===
      Color.LIGHT_BLUE
    ) {
      // backward edge
      chosenEdges.push(copy(graph.adjList.get(indexOfCurrentVertex)[i]));
      chosenEdges[chosenEdges.length - 1].color = Color.BLUE;
    } else if (
      vertices[graph.adjList.get(indexOfCurrentVertex)[i].toVertex].color ===
      Color.MENTA
    ) {
      chosenEdges.push(copy(graph.adjList.get(indexOfCurrentVertex)[i]));
      // forward edge
      if (
        vertices[graph.adjList.get(indexOfCurrentVertex)[i].toVertex]
          .discoveryTime > vertices[indexOfCurrentVertex].discoveryTime
      ) {
        chosenEdges[chosenEdges.length - 1].color = Color.YELLOW;
      } else {
        // cross edge
        chosenEdges[chosenEdges.length - 1].color = Color.ORANGE;
      }
    }
  }
  vertices[indexOfCurrentVertex].color = Color.MENTA;
  time.push(0);
  vertices[indexOfCurrentVertex].finishingTime = time.length;
  algorithmSteps.addStep(
    new Step({ vertices: vertices, chosenEdges: chosenEdges })
  );
}

function topoWithDFSVisit(
  graph,
  indexOfCurrentVertex,
  vertices,
  stack,
  topologicalOrder,
  algorithmSteps
) {
  vertices[indexOfCurrentVertex].color = Color.LIGHT_BLUE;
  for (let edge of graph.adjList.get(indexOfCurrentVertex)) {
    if (vertices[edge.toVertex].color === Color.WHITE) {
      topoWithDFSVisit(
        graph,
        edge.toVertex,
        vertices,
        stack,
        topologicalOrder,
        algorithmSteps
      );
    } else if (vertices[edge.toVertex].color === Color.LIGHT_BLUE) {
      // backward edge so circle in the graph
      throw new Error("There is a circle in the graph!");
    }
  }
  vertices[indexOfCurrentVertex].color = Color.MENTA;
  stack.push(indexOfCurrentVertex);
  topologicalOrder = copy(stack.items).reverse();
  algorithmSteps.addStep(
    new Step({
      vertices: vertices,
      stack: stack,
      topologicalOrder: topologicalOrder,
    })
  );
}

class Algorithm {
  static bfs(graph, startingNode) {
    if (!graph.directed)
      throw new Error(
        "The graph has to be directed if using Breadth-First Search."
      );
    let algorithmSteps = new AlgorithmSteps(AlgorithmType.BFS);
    let vertices = [];
    for (let i = 0; i < graph.noOfVertices; i++) vertices[i] = new Vertex();

    vertices[startingNode].depth = 0;
    vertices[startingNode].color = Color.LIGHT_BLUE;

    let queue = new Queue();
    queue.add(startingNode);

    let chosenEdges = [];
    algorithmSteps.addStep(
      new Step({
        vertices: vertices,
        queue: queue,
        currentVertex: -1,
        chosenEdges: chosenEdges,
      })
    );
    while (!queue.isEmpty()) {
      let currentVertex = queue.rem();
      for (let i = 0; i < graph.adjList.get(currentVertex).length; ++i) {
        if (
          vertices[graph.adjList.get(currentVertex)[i].toVertex].color ===
          Color.WHITE
        ) {
          chosenEdges.push(graph.adjList.get(currentVertex)[i]);
          chosenEdges[chosenEdges.length - 1].color = Color.DARK_RED;
          vertices[graph.adjList.get(currentVertex)[i].toVertex].depth =
            vertices[currentVertex].depth + 1;
          vertices[
            graph.adjList.get(currentVertex)[i].toVertex
          ].parent = currentVertex;
          vertices[graph.adjList.get(currentVertex)[i].toVertex].color =
            Color.LIGHT_BLUE;
          queue.add(graph.adjList.get(currentVertex)[i].toVertex);
        }
      }
      vertices[currentVertex].color = Color.MENTA;
      algorithmSteps.addStep(
        new Step({
          vertices: vertices,
          queue: queue,
          currentVertex: currentVertex,
          chosenEdges: chosenEdges,
        })
      );
    }
    return algorithmSteps;
  }

  static dfs(graph) {
    if (!graph.directed)
      throw new Error(
        "The graph has to be directed if using Depth-First Search."
      );
    let algorithmSteps = new AlgorithmSteps(AlgorithmType.DFS);

    let vertices = [];
    for (let i = 0; i < graph.noOfVertices; i++) {
      vertices[i] = new Vertex();
    }
    let time = [];
    let chosenEdges = [];
    algorithmSteps.addStep(
      new Step({ vertices: vertices, chosenEdges: chosenEdges })
    );

    for (let i = 0; i < vertices.length; ++i) {
      if (vertices[i].color === Color.WHITE) {
        dfsVisit(graph, i, vertices, time, algorithmSteps, chosenEdges);
      }
    }
    algorithmSteps.addStep(
      new Step({ vertices: vertices, chosenEdges: chosenEdges })
    );

    return algorithmSteps;
  }

  static isVertexInEdges(graph, vertex, edgesOfVertex) {
    for (let i = 0; i < graph.adjList.get(edgesOfVertex).length; ++i) {
      if (graph.adjList.get(edgesOfVertex)[i].toVertex === vertex) return true;
    }
    return false;
  }

  static inDegreeOfVertexInGraph(graph, vertex) {
    let inDegreeCounter = 0;
    for (const entry of graph.adjList.entries()) {
      if (
        vertex !== entry[0] &&
        Algorithm.isVertexInEdges(graph, vertex, entry[0])
      )
        ++inDegreeCounter;
    }
    return inDegreeCounter;
  }

  static topo(graph) {
    if (!graph.directed)
      throw new Error(
        "The graph has to be directed if using Topological Order."
      );
    let algorithmSteps = new AlgorithmSteps(AlgorithmType.TOPO);
    let topologicalOrder = [];
    let inDegrees = [];
    for (let i = 0; i < graph.noOfVertices; i++) {
      inDegrees[i] = Algorithm.inDegreeOfVertexInGraph(graph, i);
    }
    let vertices = [];
    let stack = new Stack();
    for (let i = 0; i < graph.noOfVertices; i++) {
      vertices[i] = new Vertex();
      if (inDegrees[i] === 0) stack.push(i);
    }

    algorithmSteps.addStep(
      new Step({
        vertices: vertices,
        stack: stack,
        topologicalOrder: topologicalOrder,
        inDegrees: inDegrees,
      })
    );
    let i = 0;
    while (!stack.isEmpty()) {
      let currentVertex = stack.pop();
      i++;
      topologicalOrder.push(currentVertex);
      vertices[currentVertex].color = Color.MENTA;
      for (let i = 0; i < graph.adjList.get(currentVertex).length; ++i) {
        inDegrees[graph.adjList.get(currentVertex)[i].toVertex]--;
        if (inDegrees[graph.adjList.get(currentVertex)[i].toVertex] === 0)
          stack.push(graph.adjList.get(currentVertex)[i].toVertex);
      }
      algorithmSteps.addStep(
        new Step({
          vertices: vertices,
          stack: stack,
          topologicalOrder: topologicalOrder,
          inDegrees: inDegrees,
        })
      );
    }
    if (i !== graph.noOfVertices)
      throw new Error("There is a circle in the graph!");

    return algorithmSteps;
  }

  static topoWithDFS(graph) {
    if (!graph.directed)
      throw new Error(
        "The graph has to be directed if using Topological Order (with DFS)."
      );
    let algorithmSteps = new AlgorithmSteps(AlgorithmType.TOPO_DFS);
    let vertices = [];
    for (let i = 0; i < graph.noOfVertices; i++) {
      vertices[i] = new Vertex();
    }

    let topologicalOrder = [];
    let stack = new Stack();
    algorithmSteps.addStep(
      new Step({
        vertices: vertices,
        stack: stack,
        topologicalOrder: topologicalOrder,
      })
    );
    for (let i = 0; i < vertices.length; ++i) {
      if (vertices[i].color === Color.WHITE)
        topoWithDFSVisit(
          graph,
          i,
          vertices,
          stack,
          topologicalOrder,
          algorithmSteps
        );
    }

    return algorithmSteps;
  }

  static kruskalMST(graph) {
    let algorithmSteps = new AlgorithmSteps(AlgorithmType.KRUSKAL);

    let sortedEdges = new PriorityQueue((edge, other) => {
      return edge.weight > other.weight;
    });
    let kruskalSets = [];
    graph.adjList.forEach((value, key, map) => {
      value.forEach((edge) => {
        sortedEdges.add(edge);
      });
      kruskalSets.push([key]);
    });

    let vertices = [];
    for (let i = 0; i < graph.noOfVertices; ++i) {
      vertices[i] = new Vertex();
      vertices[i].color =
        "rgb(" +
        randInt(256).toString() +
        "," +
        randInt(256).toString() +
        "," +
        randInt(256).toString() +
        ")";
    }
    let setColorOfVertices = (indexOfBiggerSet, indexOfSmallerSet) => {
      for (let i = 0; i < kruskalSets[indexOfSmallerSet].length; ++i) {
        vertices[kruskalSets[indexOfSmallerSet][i]].color =
          vertices[kruskalSets[indexOfBiggerSet][0]].color;
      }
    };

    let chosenEdges = [];
    algorithmSteps.addStep(
      new Step({
        vertices: vertices,
        sortedEdges: sortedEdges,
        chosenEdges: chosenEdges,
        kruskalSets: kruskalSets,
      })
    );
    while (!sortedEdges.isEmpty() || kruskalSets.length !== 1) {
      let edge = sortedEdges.remMax();
      let getListIndexOfVertex = (vertex) => {
        for (let i = 0; i < kruskalSets.length; i++) {
          if (kruskalSets[i].includes(vertex)) return i;
        }
        throw new Error("Vertex isn't in any list.");
      };

      let listIndexOfFromVertex = getListIndexOfVertex(edge.fromVertex);
      let listIndexOfToVertex = getListIndexOfVertex(edge.toVertex);

      if (listIndexOfFromVertex !== listIndexOfToVertex) {
        if (
          kruskalSets[listIndexOfFromVertex].length >=
          kruskalSets[listIndexOfToVertex].length
        )
          setColorOfVertices(listIndexOfFromVertex, listIndexOfToVertex);
        else setColorOfVertices(listIndexOfToVertex, listIndexOfFromVertex);
        chosenEdges.push(edge);
        chosenEdges[chosenEdges.length - 1].color = Color.DARK_RED;
        kruskalSets[listIndexOfFromVertex] = kruskalSets[
          listIndexOfFromVertex
        ].concat(kruskalSets[listIndexOfToVertex]);

        kruskalSets.splice(listIndexOfToVertex, 1);

        algorithmSteps.addStep(
          new Step({
            vertices: vertices,
            sortedEdges: sortedEdges,
            chosenEdges: chosenEdges,
            kruskalSets: kruskalSets,
          })
        );
      }
    }
    algorithmSteps.addStep(
      new Step({
        vertices: vertices,
        sortedEdges: sortedEdges,
        chosenEdges: chosenEdges,
        kruskalSets: kruskalSets,
      })
    );
    return algorithmSteps;
  }

  static primMST(graph, startingVertex) {
    let algorithmSteps = new AlgorithmSteps(AlgorithmType.PRIM);

    let primVertices = [];
    for (let i = 0; i < graph.noOfVertices; i++)
      primVertices.push(new Vertex());
    primVertices[startingVertex].cost = 0;

    let prQueue = new PriorityQueue((vertex, other, sortByList) => {
      return (
        (sortByList[vertex].cost === null
          ? Infinity
          : sortByList[vertex].cost) >
        (sortByList[other].cost === null ? Infinity : sortByList[other].cost)
      );
    });
    prQueue.setSortByList(primVertices);
    for (let i = 0; i < graph.noOfVertices; i++) {
      prQueue.add(i);
    }
    let stepCounter = 0;
    let chosenEdges = [];
    algorithmSteps.addStep(
      new Step({
        step: stepCounter,
        vertices: primVertices,
        currentVertex: -1,
        chosenEdges: chosenEdges,
      })
    );
    const addNewEdgeToChosenEdges = (chosenEdges, edge) => {
      let i = 0;
      while (i < chosenEdges.length) {
        if (chosenEdges[i].toVertex === edge.toVertex) {
          chosenEdges.splice(i, 1);
        } else ++i;
      }
      chosenEdges.push(edge);
      chosenEdges[chosenEdges.length - 1].color = Color.DARK_RED;
      return chosenEdges;
    };
    while (!prQueue.isEmpty()) {
      let currentVertex = prQueue.remMax();
      primVertices[currentVertex].color = Color.MENTA;
      stepCounter++;
      for (let i = 0; i < graph.adjList.get(currentVertex).length; ++i) {
        if (
          prQueue.isInQueue(graph.adjList.get(currentVertex)[i].toVertex) &&
          primVertices[graph.adjList.get(currentVertex)[i].toVertex].cost >
            graph.adjList.get(currentVertex)[i].weight
        ) {
          primVertices[
            graph.adjList.get(currentVertex)[i].toVertex
          ].cost = graph.adjList.get(currentVertex)[i].weight;
          primVertices[
            graph.adjList.get(currentVertex)[i].toVertex
          ].parent = currentVertex;
          chosenEdges = addNewEdgeToChosenEdges(
            chosenEdges,
            graph.adjList.get(currentVertex)[i]
          );
          primVertices[graph.adjList.get(currentVertex)[i].toVertex].color =
            Color.LIGHT_BLUE;
          prQueue.setSortByList(primVertices);
        }
      }
      algorithmSteps.addStep(
        new Step({
          step: stepCounter,
          vertices: primVertices,
          currentVertex: currentVertex,
          chosenEdges: chosenEdges,
        })
      );
    }

    return algorithmSteps;
  }

  static queueBasedBF(graph, startingVertex) {
    if (!graph.directed)
      throw new Error(
        "The graph has to be directed if using queue based Bellman-Ford algorithm."
      );
    let algorithmSteps = new AlgorithmSteps(AlgorithmType.QBBF);

    let bfVertices = [];
    for (let i = 0; i < graph.noOfVertices; i++) {
      bfVertices.push(new Vertex());
    }
    bfVertices[startingVertex].distance = 0;

    let queue = new Queue();
    queue.add(startingVertex);
    let stepCounter = 0;
    let chosenEdges = [];
    bfVertices[startingVertex].color = Color.LIGHT_BLUE;

    algorithmSteps.addStep(
      new Step({
        step: stepCounter,
        vertices: bfVertices,
        queue: queue,
        round: null,
        currentVertex: -1,
        chosenEdges: chosenEdges,
      })
    );
    let roundCounter = 0;
    let roundChecker = [];
    roundChecker.push([startingVertex]);
    roundChecker.push([]);
    const addNewEdgeToChosenEdges = (chosenEdges, edge) => {
      let i = 0;
      while (i < chosenEdges.length) {
        if (chosenEdges[i].toVertex === edge.toVertex) {
          chosenEdges.splice(i, 1);
        } else ++i;
      }
      chosenEdges.push(edge);
      chosenEdges[chosenEdges.length - 1].color = Color.DARK_RED;
      return chosenEdges;
    };
    while (!queue.isEmpty()) {
      if (roundChecker[roundCounter].length === 0) {
        ++roundCounter;
        roundChecker[roundCounter + 1] = [];
      }
      let currentVertex = queue.rem();
      roundChecker[roundCounter].splice(
        roundChecker[roundCounter].indexOf(currentVertex),
        1
      );
      bfVertices[currentVertex].color = Color.MENTA;
      stepCounter++;
      for (let edge of graph.adjList.get(currentVertex)) {
        if (
          bfVertices[currentVertex].distance + edge.weight <
          bfVertices[edge.toVertex].distance
        ) {
          bfVertices[edge.toVertex].distance =
            bfVertices[currentVertex].distance + edge.weight;
          bfVertices[edge.toVertex].parent = currentVertex;
          if (!queue.isInQueue(edge.toVertex)) {
            bfVertices[edge.toVertex].color = Color.LIGHT_BLUE;
            chosenEdges = addNewEdgeToChosenEdges(chosenEdges, edge);
            queue.add(edge.toVertex);
            roundChecker[roundCounter + 1].push(edge.toVertex);
          }
        }
      }
      algorithmSteps.addStep(
        new Step({
          step: stepCounter,
          vertices: bfVertices,
          queue: queue,
          round: roundCounter,
          currentVertex: currentVertex,
          chosenEdges: chosenEdges,
        })
      );
    }

    return algorithmSteps;
  }

  static dijkstra(graph, startingVertex) {
    if (!graph.directed)
      throw new Error(
        "The graph has to be directed if using Dijkstra's algorithm."
      );
    (() => {
      for (let edgeList of graph.adjList.values()) {
        for (let edge of edgeList) {
          if (edge.weight < 0)
            throw new Error(
              "The edges' weight cannot be negative if using Dijkstra's algorithm."
            );
        }
      }
    })();

    let algorithmSteps = new AlgorithmSteps(AlgorithmType.DIJKSTRA);

    let dijkstraVertices = [];
    for (let i = 0; i < graph.noOfVertices; i++) {
      dijkstraVertices.push(new Vertex());
    }
    dijkstraVertices[startingVertex].distance = 0;

    let queue = new PriorityQueue((vert, other, sortByList) => {
      return (
        (sortByList[vert].distance === null
          ? Infinity
          : sortByList[vert].distance) >
        (sortByList[other].distance === null
          ? Infinity
          : sortByList[other].distance)
      );
    });
    queue.setSortByList(dijkstraVertices);
    for (let i = 0; i < graph.noOfVertices; i++) {
      queue.add(i);
    }
    let currentVertex = null;
    let chosenEdges = [];
    algorithmSteps.addStep(
      new Step({
        step: -1,
        vertices: dijkstraVertices,
        queue: queue,
        currentVertex: currentVertex,
        chosenEdges: chosenEdges,
      })
    );
    const addNewEdgeToChosenEdges = (chosenEdges, edge) => {
      let i = 0;
      while (i < chosenEdges.length) {
        if (chosenEdges[i].toVertex === edge.toVertex) {
          chosenEdges.splice(i, 1);
        } else ++i;
      }
      chosenEdges.push(edge);
      chosenEdges[chosenEdges.length - 1].color = Color.DARK_RED;
      return chosenEdges;
    };
    let i = 0;
    while (!queue.isEmpty()) {
      currentVertex = queue.remMax();
      dijkstraVertices[currentVertex].color = Color.MENTA;
      for (let edge of graph.adjList.get(currentVertex)) {
        if (
          dijkstraVertices[edge.toVertex].distance >
          dijkstraVertices[currentVertex].distance + edge.weight
        ) {
          dijkstraVertices[edge.toVertex].distance =
            dijkstraVertices[currentVertex].distance + edge.weight;
          dijkstraVertices[edge.toVertex].parent = currentVertex;
          dijkstraVertices[edge.toVertex].color = Color.LIGHT_BLUE;
          chosenEdges = addNewEdgeToChosenEdges(chosenEdges, edge);
          queue.setSortByList(dijkstraVertices);
        }
      }
      algorithmSteps.addStep(
        new Step({
          step: i,
          vertices: dijkstraVertices,
          queue: queue,
          currentVertex: currentVertex,
          chosenEdges: chosenEdges,
        })
      );
      ++i;
    }
    algorithmSteps.addStep(
      new Step({
        step: -2,
        vertices: dijkstraVertices,
        queue: queue,
        currentVertex: null,
        chosenEdges: chosenEdges,
      })
    );
    return algorithmSteps;
  }

  static floydWarshall(graph) {
    let algorithmSteps = new AlgorithmSteps(AlgorithmType.FW);

    let distanceMatrix = [];
    let parentMatrix = [];
    for (let i = 0; i < graph.noOfVertices; i++) {
      distanceMatrix[i] = [];
      parentMatrix[i] = [];
      for (let j = 0; j < graph.noOfVertices; j++) {
        if (i === j) {
          distanceMatrix[i][j] = 0;
          parentMatrix[i][j] = null;
        } else if (
          (() => {
            for (let edge of graph.adjList.get(i)) {
              if (edge.toVertex === j) return true;
            }
            return false;
          })()
        ) {
          let edge = (() => {
            for (let edge of graph.adjList.get(i)) {
              if (edge.toVertex === j) return edge;
            }
          })();
          distanceMatrix[i][j] = edge.weight;
          parentMatrix[i][j] = i;
        } else {
          distanceMatrix[i][j] = Infinity;
          parentMatrix[i][j] = null;
        }
      }
    }

    let vertices = [];
    for (let i = 0; i < graph.noOfVertices; ++i) {
      vertices[i] = new Vertex();
    }
    let setColorOfVertices = (k, i, j) => {
      for (let index = 0; index < vertices.length; ++index) {
        if (index === k) vertices[index].color = Color.YELLOW;
        else if (index === i) vertices[index].color = Color.PALE_RED;
        else if (index === j) vertices[index].color = Color.GREEN;
        else vertices[index].color = Color.WHITE;
      }
    };

    algorithmSteps.addStep(
      new Step({
        distanceMatrix: distanceMatrix,
        parentMatrix: parentMatrix,
        k: null,
        i: null,
        j: null,
        vertices: vertices,
      })
    );
    for (let k = 0; k < graph.noOfVertices; k++) {
      for (let i = 0; i < graph.noOfVertices; i++) {
        for (let j = 0; j < graph.noOfVertices; j++) {
          if (
            distanceMatrix[i][j] >
            distanceMatrix[i][k] + distanceMatrix[k][j]
          ) {
            distanceMatrix[i][j] = distanceMatrix[i][k] + distanceMatrix[k][j];
            parentMatrix[i][j] = parentMatrix[k][j];
            setColorOfVertices(k, i, j);
            algorithmSteps.addStep(
              new Step({
                distanceMatrix: distanceMatrix,
                parentMatrix: parentMatrix,
                k: k,
                i: i,
                j: j,
                vertices: vertices,
              })
            );
          }
        }
      }
    }

    return algorithmSteps;
  }
}

exports.AlgorithmType = AlgorithmType;
exports.AlgorithmSteps = AlgorithmSteps;
exports.Algorithm = Algorithm;
