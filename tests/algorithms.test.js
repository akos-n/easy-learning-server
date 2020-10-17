const {
  Algorithm,
  AlgorithmSteps,
  AlgorithmType,
} = require("../graph_algorithm_utils/algorithms");
let { Color } = require("../graph_algorithm_utils/algorithm_utils");

describe("Test Class: AlgorithmSteps", () => {
  test("Test Function: constructor (empty)", () => {
    expect(() => {
      new AlgorithmSteps();
    }).toThrow("Algorithm's JSON file was not found.");
  });

  test("Test Function: constructor with BFS", () => {
    const algorithmSteps = new AlgorithmSteps(AlgorithmType.BFS);
    expect(algorithmSteps.algorithmType).toBe("Breadth-First Search");
    expect(algorithmSteps.algorithmDescription).toBe(
      "Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level."
    );
  });

  test("Test Function: constructor with DFS", () => {
    const algorithmSteps = new AlgorithmSteps(AlgorithmType.DFS);
    expect(algorithmSteps.algorithmType).toBe("Depth-First Search");
    expect(algorithmSteps.algorithmDescription).toBe(
      "Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking."
    );
  });

  test("Test Function: constructor with TOPO", () => {
    const algorithmSteps = new AlgorithmSteps(AlgorithmType.TOPO);
    expect(algorithmSteps.algorithmType).toBe("Topological order");
    expect(algorithmSteps.algorithmDescription).toBe(
      "In computer science, a topological sort or topological ordering of a directed graph is a linear ordering of its vertices such that for every directed edge uv from vertex u to vertex v, u comes before v in the ordering."
    );
  });

  test("Test Function: constructor with TOPO-DFS", () => {
    const algorithmSteps = new AlgorithmSteps(AlgorithmType.TOPO_DFS);
    expect(algorithmSteps.algorithmType).toBe(
      "Topological order with Depth-First Search"
    );
    expect(algorithmSteps.algorithmDescription).toBe(
      "An alternative algorithm for topological sorting is based on depth-first search. The algorithm loops through each node of the graph, in an arbitrary order, initiating a depth-first search that terminates when it hits any node that has already been visited since the beginning of the topological sort or the node has no outgoing edges."
    );
  });

  test("Test Function: constructor with KRUSKAL", () => {
    const algorithmSteps = new AlgorithmSteps(AlgorithmType.KRUSKAL);
    expect(algorithmSteps.algorithmType).toBe(
      "Kruskal algorithm for minimum-spanning-tree"
    );
    expect(algorithmSteps.algorithmDescription).toBe(
      "Kruskal's algorithm is a minimum-spanning-tree algorithm which finds an edge of the least possible weight that connects any two trees in the forest. It is a greedy algorithm in graph theory as it finds a minimum spanning tree for a connected weighted graph adding increasing cost arcs at each step. This means it finds a subset of the edges that forms a tree that includes every vertex, where the total weight of all the edges in the tree is minimized. If the graph is not connected, then it finds a minimum spanning forest (a minimum spanning tree for each connected component)."
    );
  });

  test("Test Function: constructor with PRIM", () => {
    const algorithmSteps = new AlgorithmSteps(AlgorithmType.PRIM);
    expect(algorithmSteps.algorithmType).toBe(
      "Prim's algorithm for minimum-spanning-tree"
    );
    expect(algorithmSteps.algorithmDescription).toBe(
      "In computer science, Prim's (also known as Jarník's) algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph. This means it finds a subset of the edges that forms a tree that includes every vertex, where the total weight of all the edges in the tree is minimized. The algorithm operates by building this tree one vertex at a time, from an arbitrary starting vertex, at each step adding the cheapest possible connection from the tree to another vertex."
    );
  });

  test("Test Function: constructor with DIJKSTRA", () => {
    const algorithmSteps = new AlgorithmSteps(AlgorithmType.DIJKSTRA);
    expect(algorithmSteps.algorithmType).toBe(
      "Dijkstra's Shortest Path First algorithm"
    );
    expect(algorithmSteps.algorithmDescription).toBe(
      "Dijkstra's algorithm (or Dijkstra's Shortest Path First algorithm, SPF algorithm) is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later.\n\nThe algorithm exists in many variants. Dijkstra's original algorithm found the shortest path between two given nodes, but a more common variant fixes a single node as the \"source\" node and finds shortest paths from the source to all other nodes in the graph, producing a shortest-path tree."
    );
  });

  test("Test Function: constructor with QBBF", () => {
    const algorithmSteps = new AlgorithmSteps(AlgorithmType.QBBF);
    expect(algorithmSteps.algorithmType).toBe(
      "Queue-based Bellman-Ford algorithm (shortest path)"
    );
    expect(algorithmSteps.algorithmDescription).toBe(
      "The Bellman–Ford algorithm is an algorithm that computes shortest paths from a single source vertex to all of the other vertices in a weighted digraph. It is slower than Dijkstra's algorithm for the same problem, but more versatile, as it is capable of handling graphs in which some of the edge weights are negative numbers."
    );
  });

  test("Test Function: constructor with FW", () => {
    const algorithmSteps = new AlgorithmSteps(AlgorithmType.FW);
    expect(algorithmSteps.algorithmType).toBe(
      "Floyd-Warshall algorithm (shortest path)"
    );
    expect(algorithmSteps.algorithmDescription).toBe(
      "In computer science, the Floyd–Warshall algorithm (also known as Floyd's algorithm, the Roy–Warshall algorithm, the Roy–Floyd algorithm, or the WFI algorithm) is an algorithm for finding shortest paths in a weighted graph with positive or negative edge weights (but with no negative cycles). A single execution of the algorithm will find the lengths (summed weights) of shortest paths between all pairs of vertices. Although it does not return details of the paths themselves, it is possible to reconstruct the paths with simple modifications to the algorithm."
    );
  });

  let algorithmSteps = new AlgorithmSteps(AlgorithmType.BFS);
  test("Test Function: constructor (general)", () => {
    expect(algorithmSteps.steps).not.toBeNull();
    expect(algorithmSteps.currentStepIndex).not.toBeNull();
    expect(algorithmSteps.steps).toEqual([]);
    expect(algorithmSteps.currentStepIndex).toBe(0);
  });

  test("Test Function: addStep", () => {
    expect(algorithmSteps.steps.length).toBe(0);
    algorithmSteps.addStep({ obj: true, index: 0 });
    expect(algorithmSteps.steps.length).toBe(1);
    expect(algorithmSteps.steps[0]).toEqual({ obj: true, index: 0 });
  });
});

describe("Test Class: Algorithm", () => {
  describe("Test Function: bfs", () => {
    test("Test Case: undirected graph error", () => {
      expect(() => {
        Algorithm.bfs({ directed: false }, 0);
      }).toThrow("The graph has to be directed if using Breadth-First Search.");
    });

    let graphBFS = {
      directed: true,
      noOfVertices: 6,
      adjList: [
        [0, [{ fromVertex: 0, toVertex: 1, weight: 1, color: "rgb(0,0,0)" }]],
        [
          1,
          [
            { fromVertex: 1, toVertex: 3, weight: 1, color: "rgb(0,0,0)" },
            { fromVertex: 1, toVertex: 4, weight: 1, color: "rgb(0,0,0)" },
            { fromVertex: 1, toVertex: 2, weight: 1, color: "rgb(0,0,0)" },
          ],
        ],
        [2, [{ fromVertex: 2, toVertex: 4, weight: 1, color: "rgb(0,0,0)" }]],
        [3, [{ fromVertex: 3, toVertex: 0, weight: 1, color: "rgb(0,0,0)" }]],
        [4, [{ fromVertex: 4, toVertex: 3, weight: 1, color: "rgb(0,0,0)" }]],
        [
          5,
          [
            { fromVertex: 5, toVertex: 2, weight: 1, color: "rgb(0,0,0)" },
            { fromVertex: 5, toVertex: 4, weight: 1, color: "rgb(0,0,0)" },
          ],
        ],
      ],
    };
    graphBFS.adjList = new Map(graphBFS.adjList);

    let result = Algorithm.bfs(graphBFS, 5);
    test("Result: number of steps", () => {
      expect(result.steps.length).toBe(7);
    });

    test("Result: first step", () => {
      expect(result.steps[0].vertices.length).toBe(6);
      expect(result.steps[0].queue.items.length).toBe(1);
      expect(result.steps[0].queue.items[0]).toBe(5);
      expect(result.steps[0].currentVertex).toBe(-1);
    });

    test("Result: second step", () => {
      expect(result.steps[1].vertices.length).toBe(6);
      expect(result.steps[1].vertices[5].color).toBe(Color.MENTA);
      expect(result.steps[1].vertices[2].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[1].vertices[4].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[1].queue.items.length).toBe(2);
      expect(result.steps[1].queue.items).toEqual([2, 4]);
      expect(result.steps[1].currentVertex).toBe(5);
    });

    test("Result: last step", () => {
      expect(result.steps[6].vertices.length).toBe(6);
      expect(result.steps[6].vertices[0].color).toBe(Color.MENTA);
      expect(result.steps[6].vertices[1].color).toBe(Color.MENTA);
      expect(result.steps[6].vertices[2].color).toBe(Color.MENTA);
      expect(result.steps[6].vertices[3].color).toBe(Color.MENTA);
      expect(result.steps[6].vertices[4].color).toBe(Color.MENTA);
      expect(result.steps[6].vertices[5].color).toBe(Color.MENTA);
      expect(result.steps[6].queue.items.length).toBe(0);
      expect(result.steps[6].queue.items).toEqual([]);
      expect(result.steps[6].currentVertex).toBe(1);
    });
  });

  describe("Test Function: dfs", () => {
    test("Test Case: undirected graph error", () => {
      expect(() => {
        Algorithm.dfs({ directed: false }, 0);
      }).toThrow("The graph has to be directed if using Depth-First Search.");
    });

    let graphDFS = {
      directed: true,
      noOfVertices: 8,
      adjList: [
        [0, [{ fromVertex: 0, toVertex: 1, weight: 1, color: "rgb(0,0,0)" }]],
        [
          1,
          [
            { fromVertex: 1, toVertex: 2, weight: 1, color: "rgb(0,0,0)" },
            { fromVertex: 1, toVertex: 4, weight: 1, color: "rgb(0,0,0)" },
            { fromVertex: 1, toVertex: 5, weight: 1, color: "rgb(0,0,0)" },
          ],
        ],
        [2, [{ fromVertex: 2, toVertex: 3, weight: 1, color: "rgb(0,0,0)" }]],
        [
          3,
          [
            { fromVertex: 3, toVertex: 2, weight: 1, color: "rgb(0,0,0)" },
            { fromVertex: 3, toVertex: 7, weight: 1, color: "rgb(0,0,0)" },
          ],
        ],
        [
          4,
          [
            { fromVertex: 4, toVertex: 5, weight: 1, color: "rgb(0,0,0)" },
            { fromVertex: 4, toVertex: 0, weight: 1, color: "rgb(0,0,0)" },
          ],
        ],
        [5, [{ fromVertex: 5, toVertex: 6, weight: 1, color: "rgb(0,0,0)" }]],
        [
          6,
          [
            { fromVertex: 6, toVertex: 5, weight: 1, color: "rgb(0,0,0)" },
            { fromVertex: 6, toVertex: 7, weight: 1, color: "rgb(0,0,0)" },
          ],
        ],
        [7, []],
      ],
    };
    graphDFS.adjList = new Map(graphDFS.adjList);

    let result = Algorithm.dfs(graphDFS);
    test("Result: number of steps", () => {
      expect(result.steps.length).toBe(18);
    });

    test("Result: first step", () => {
      expect(result.steps[0].vertices.length).toBe(8);
      for (let i = 0; i < result.steps[0].vertices.length; ++i) {
        expect(result.steps[0].vertices[i].color).toBe(Color.WHITE);
      }
    });

    test("Result: fifth step", () => {
      for (let i = 0; i < result.steps[4].vertices.length; ++i) {
        if ([0, 1, 2, 3].includes(i)) {
          expect(result.steps[4].vertices[i].color).toBe(Color.LIGHT_BLUE);
          expect(result.steps[4].vertices[i].discoveryTime).not.toBe(0);
        } else if ([].includes(i)) {
          expect(result.steps[4].vertices[i].color).toBe(Color.MENTA);
          expect(result.steps[4].vertices[i].discoveryTime).not.toBe(0);
          expect(result.steps[4].vertices[i].finishingTime).not.toBe(0);
        } else {
          expect(result.steps[4].vertices[i].color).toBe(Color.WHITE);
          expect(result.steps[4].vertices[i].discoveryTime).toBe(0);
        }
      }
    });

    test("Result: last step", () => {
      for (let i = 0; i < result.steps[17].vertices.length; ++i) {
        expect(result.steps[17].vertices[i].color).toBe(Color.MENTA);
        expect(result.steps[17].vertices[i].discoveryTime).not.toBe(0);
        expect(result.steps[17].vertices[i].finishingTime).not.toBe(0);
      }
    });
  });

  describe("Test Function: topo", () => {
    test("Test Case: undirected graph error", () => {
      expect(() => {
        Algorithm.topo({ directed: false }, 0);
      }).toThrow("The graph has to be directed if using Topological Order.");
    });

    test("Test Case: circle in graph error", () => {
      expect(() => {
        const graph = {
          directed: true,
          noOfVertices: 3,
          adjList: [
            [
              0,
              [
                {
                  fromVertex: 0,
                  toVertex: 1,
                  weight: 1,
                  color: "rgb(0,0,0)",
                },
              ],
            ],
            [
              1,
              [
                {
                  fromVertex: 1,
                  toVertex: 2,
                  weight: 0,
                  color: "rgb(0,0,0)",
                },
              ],
            ],
            [
              2,
              [
                {
                  fromVertex: 2,
                  toVertex: 0,
                  weight: 1,
                  color: "rgb(0,0,0)",
                },
              ],
            ],
          ],
        };
        graph.adjList = new Map(graph.adjList);
        Algorithm.topo(graph);
      }).toThrow("There is a circle in the graph!");
    });

    let graphTOPO = {
      directed: true,
      noOfVertices: 6,
      adjList: [
        [0, [{ fromVertex: 0, toVertex: 1, weight: 1, color: "rgb(0,0,0)" }]],
        [
          1,
          [
            { fromVertex: 1, toVertex: 4, weight: 1, color: "rgb(0,0,0)" },
            { fromVertex: 1, toVertex: 2, weight: 1, color: "rgb(0,0,0)" },
          ],
        ],
        [2, [{ fromVertex: 2, toVertex: 5, weight: 1, color: "rgb(0,0,0)" }]],
        [3, []],
        [4, [{ fromVertex: 4, toVertex: 3, weight: 1, color: "rgb(0,0,0)" }]],
        [5, [{ fromVertex: 5, toVertex: 4, weight: 1, color: "rgb(0,0,0)" }]],
      ],
    };
    graphTOPO.adjList = new Map(graphTOPO.adjList);

    let result = Algorithm.topo(graphTOPO);
    test("Result: number of steps", () => {
      expect(result.steps.length).toBe(7);
    });

    test("Result: first step", () => {
      expect(result.steps[0].vertices.length).toBe(6);
      expect(result.steps[0].stack.items).toEqual([0]);
      expect(result.steps[0].topologicalOrder).toEqual([]);
      expect(result.steps[0].inDegrees).toEqual([0, 1, 1, 1, 2, 1]);
    });

    test("Result: fourth step", () => {
      expect(result.steps[3].stack.items).toEqual([5]);
      expect(result.steps[3].topologicalOrder).toEqual([0, 1, 2]);
      expect(result.steps[3].inDegrees).toEqual([0, 0, 0, 1, 1, 0]);
    });

    test("Result: last step", () => {
      expect(result.steps[6].stack.items).toEqual([]);
      expect(result.steps[6].topologicalOrder).toEqual([0, 1, 2, 5, 4, 3]);
      expect(result.steps[6].inDegrees).toEqual([0, 0, 0, 0, 0, 0]);
    });
  });

  describe("Test Function: topoWithDFS", () => {
    test("Test Case: undirected graph error", () => {
      expect(() => {
        Algorithm.topoWithDFS({ directed: false }, 0);
      }).toThrow(
        "The graph has to be directed if using Topological Order (with DFS)."
      );
    });

    let graphTOPODFS = {
      directed: true,
      noOfVertices: 6,
      adjList: [
        [0, [{ fromVertex: 0, toVertex: 1, weight: 1, color: "rgb(0,0,0)" }]],
        [
          1,
          [
            { fromVertex: 1, toVertex: 4, weight: 1, color: "rgb(0,0,0)" },
            { fromVertex: 1, toVertex: 2, weight: 1, color: "rgb(0,0,0)" },
          ],
        ],
        [2, [{ fromVertex: 2, toVertex: 5, weight: 1, color: "rgb(0,0,0)" }]],
        [3, []],
        [4, [{ fromVertex: 4, toVertex: 3, weight: 1, color: "rgb(0,0,0)" }]],
        [5, [{ fromVertex: 5, toVertex: 4, weight: 1, color: "rgb(0,0,0)" }]],
      ],
    };
    graphTOPODFS.adjList = new Map(graphTOPODFS.adjList);

    let result = Algorithm.topoWithDFS(graphTOPODFS);
    test("Result: number of steps", () => {
      expect(result.steps.length).toBe(7);
    });

    test("Result: first step", () => {
      expect(result.steps[0].vertices.length).toBe(6);
      expect(result.steps[0].stack.items).toEqual([]);
      for (let i = 0; i < result.steps[0].vertices.length; ++i) {
        expect(result.steps[0].vertices[i].color).toBe(Color.WHITE);
      }
      expect(result.steps[0].topologicalOrder).toEqual([]);
    });

    test("Result: fourth step", () => {
      expect(result.steps[3].vertices.length).toBe(6);
      expect(result.steps[3].stack.items).toEqual([3, 4, 5]);
      for (let i = 0; i < result.steps[3].vertices.length; ++i) {
        if ([0, 1, 2].includes(i)) {
          expect(result.steps[3].vertices[i].color).toBe(Color.LIGHT_BLUE);
        } else if ([3, 4, 5].includes(i)) {
          expect(result.steps[3].vertices[i].color).toBe(Color.MENTA);
        } else {
          expect(result.steps[3].vertices[i].color).toBe(Color.WHITE);
        }
      }
      expect(result.steps[3].topologicalOrder).toEqual([5, 4, 3]);
    });

    test("Result: last step", () => {
      expect(result.steps[6].vertices.length).toBe(6);
      expect(result.steps[6].stack.items).toEqual([3, 4, 5, 2, 1, 0]);
      for (let i = 0; i < result.steps[6].vertices.length; ++i) {
        expect(result.steps[6].vertices[i].color).toBe(Color.MENTA);
      }
      expect(result.steps[6].topologicalOrder).toEqual([0, 1, 2, 5, 4, 3]);
    });
  });

  describe("Test Function: kruskalMST", () => {
    test("Test Case: invalid vertex index in Edge", () => {
      const invalidGraph = {
        directed: false,
        noOfVertices: 6,
        adjList: [
          [
            0,
            [
              { fromVertex: 0, toVertex: 1, weight: 2, color: "rgb(0,0,0)" },
              { fromVertex: 0, toVertex: 8, weight: 4, color: "rgb(0,0,0)" },
            ],
          ],
        ],
      };
      invalidGraph.adjList = new Map(invalidGraph.adjList);
      expect(() => {
        Algorithm.kruskalMST(invalidGraph);
      }).toThrow("Vertex isn't in any list.");
    });

    let graphKRUSKAL = {
      directed: false,
      noOfVertices: 6,
      adjList: [
        [
          0,
          [
            { fromVertex: 0, toVertex: 1, weight: 2, color: "rgb(0,0,0)" },
            { fromVertex: 0, toVertex: 3, weight: 4, color: "rgb(0,0,0)" },
          ],
        ],
        [
          1,
          [
            { fromVertex: 1, toVertex: 0, weight: 2, color: "rgb(0,0,0)" },
            { fromVertex: 1, toVertex: 2, weight: 6, color: "rgb(0,0,0)" },
            { fromVertex: 1, toVertex: 4, weight: 3, color: "rgb(0,0,0)" },
            { fromVertex: 1, toVertex: 3, weight: 5, color: "rgb(0,0,0)" },
          ],
        ],
        [
          2,
          [
            { fromVertex: 2, toVertex: 1, weight: 6, color: "rgb(0,0,0)" },
            { fromVertex: 2, toVertex: 4, weight: 6, color: "rgb(0,0,0)" },
            { fromVertex: 2, toVertex: 5, weight: 5, color: "rgb(0,0,0)" },
          ],
        ],
        [
          3,
          [
            { fromVertex: 3, toVertex: 1, weight: 5, color: "rgb(0,0,0)" },
            { fromVertex: 3, toVertex: 4, weight: 1, color: "rgb(0,0,0)" },
            { fromVertex: 3, toVertex: 0, weight: 4, color: "rgb(0,0,0)" },
          ],
        ],
        [
          4,
          [
            { fromVertex: 4, toVertex: 1, weight: 3, color: "rgb(0,0,0)" },
            { fromVertex: 4, toVertex: 3, weight: 1, color: "rgb(0,0,0)" },
            { fromVertex: 4, toVertex: 5, weight: 2, color: "rgb(0,0,0)" },
            { fromVertex: 4, toVertex: 2, weight: 6, color: "rgb(0,0,0)" },
          ],
        ],
        [
          5,
          [
            { fromVertex: 5, toVertex: 4, weight: 2, color: "rgb(0,0,0)" },
            { fromVertex: 5, toVertex: 2, weight: 5, color: "rgb(0,0,0)" },
          ],
        ],
      ],
    };
    graphKRUSKAL.adjList = new Map(graphKRUSKAL.adjList);

    let result = Algorithm.kruskalMST(graphKRUSKAL);
    test("Result: number of steps", () => {
      expect(result.steps.length).toBe(7);
    });

    test("Result: first step", () => {
      expect(result.steps[0].vertices.length).toBe(6);
      expect(result.steps[0].sortedEdges.items).toEqual([
        { color: "rgb(0,0,0)", fromVertex: 3, toVertex: 4, weight: 1 },
        { color: "rgb(0,0,0)", fromVertex: 0, toVertex: 1, weight: 2 },
        { color: "rgb(0,0,0)", fromVertex: 4, toVertex: 3, weight: 1 },
        { color: "rgb(0,0,0)", fromVertex: 5, toVertex: 4, weight: 2 },
        { color: "rgb(0,0,0)", fromVertex: 1, toVertex: 4, weight: 3 },
        { color: "rgb(0,0,0)", fromVertex: 4, toVertex: 1, weight: 3 },
        { color: "rgb(0,0,0)", fromVertex: 1, toVertex: 0, weight: 2 },
        { color: "rgb(0,0,0)", fromVertex: 2, toVertex: 5, weight: 5 },
        { color: "rgb(0,0,0)", fromVertex: 5, toVertex: 2, weight: 5 },
        { color: "rgb(0,0,0)", fromVertex: 3, toVertex: 1, weight: 5 },
        { color: "rgb(0,0,0)", fromVertex: 0, toVertex: 3, weight: 4 },
        { color: "rgb(0,0,0)", fromVertex: 1, toVertex: 3, weight: 5 },
        { color: "rgb(0,0,0)", fromVertex: 3, toVertex: 0, weight: 4 },
        { color: "rgb(0,0,0)", fromVertex: 2, toVertex: 1, weight: 6 },
        { color: "rgb(0,0,0)", fromVertex: 4, toVertex: 5, weight: 2 },
        { color: "rgb(0,0,0)", fromVertex: 4, toVertex: 2, weight: 6 },
        { color: "rgb(0,0,0)", fromVertex: 2, toVertex: 4, weight: 6 },
        { color: "rgb(0,0,0)", fromVertex: 1, toVertex: 2, weight: 6 },
      ]);
      for (let i = 0; i < result.steps[3].kruskalSets.length; ++i) {
        for (let j = 1; j < result.steps[3].kruskalSets[i].length; ++j) {
          expect(
            result.steps[3].vertices[result.steps[3].kruskalSets[i][0]].color
          ).toBe(
            result.steps[3].vertices[result.steps[3].kruskalSets[i][j]].color
          );
        }
        for (let j = i + 1; j < result.steps[3].kruskalSets.length; ++j) {
          expect(
            result.steps[3].vertices[result.steps[3].kruskalSets[i][0]].color
          ).not.toBe(
            result.steps[3].vertices[result.steps[3].kruskalSets[j][0]].color
          );
        }
      }
      expect(result.steps[0].chosenEdges).toEqual([]);
      expect(result.steps[0].kruskalSets).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
      ]);
    });

    test("Result: fourth step", () => {
      expect(result.steps[3].vertices.length).toBe(6);
      expect(result.steps[3].sortedEdges.items).toEqual([
        {
          color: "rgb(0,0,0)",
          fromVertex: 1,
          toVertex: 0,
          weight: 2,
        },
        {
          color: "rgb(0,0,0)",
          fromVertex: 1,
          toVertex: 4,
          weight: 3,
        },
        {
          color: "rgb(0,0,0)",
          fromVertex: 4,
          toVertex: 5,
          weight: 2,
        },
        {
          color: "rgb(0,0,0)",
          fromVertex: 2,
          toVertex: 5,
          weight: 5,
        },
        {
          color: "rgb(0,0,0)",
          fromVertex: 0,
          toVertex: 3,
          weight: 4,
        },
        {
          color: "rgb(0,0,0)",
          fromVertex: 4,
          toVertex: 1,
          weight: 3,
        },
        {
          color: "rgb(0,0,0)",
          fromVertex: 1,
          toVertex: 2,
          weight: 6,
        },
        {
          color: "rgb(0,0,0)",
          fromVertex: 2,
          toVertex: 4,
          weight: 6,
        },
        {
          color: "rgb(0,0,0)",
          fromVertex: 5,
          toVertex: 2,
          weight: 5,
        },
        {
          color: "rgb(0,0,0)",
          fromVertex: 3,
          toVertex: 1,
          weight: 5,
        },
        {
          color: "rgb(0,0,0)",
          fromVertex: 4,
          toVertex: 2,
          weight: 6,
        },
        {
          color: "rgb(0,0,0)",
          fromVertex: 1,
          toVertex: 3,
          weight: 5,
        },
        {
          color: "rgb(0,0,0)",
          fromVertex: 3,
          toVertex: 0,
          weight: 4,
        },
        {
          color: "rgb(0,0,0)",
          fromVertex: 2,
          toVertex: 1,
          weight: 6,
        },
      ]);
      for (let i = 0; i < result.steps[3].kruskalSets.length; ++i) {
        for (let j = 1; j < result.steps[3].kruskalSets[i].length; ++j) {
          expect(
            result.steps[3].vertices[result.steps[3].kruskalSets[i][0]].color
          ).toBe(
            result.steps[3].vertices[result.steps[3].kruskalSets[i][j]].color
          );
        }
        for (let j = i + 1; j < result.steps[3].kruskalSets.length; ++j) {
          expect(
            result.steps[3].vertices[result.steps[3].kruskalSets[i][0]].color
          ).not.toBe(
            result.steps[3].vertices[result.steps[3].kruskalSets[j][0]].color
          );
        }
      }
      expect(result.steps[3].chosenEdges).toEqual([
        {
          color: "rgb(139, 0, 0)",
          fromVertex: 3,
          toVertex: 4,
          weight: 1,
        },
        {
          color: "rgb(139, 0, 0)",
          fromVertex: 0,
          toVertex: 1,
          weight: 2,
        },
        {
          color: "rgb(139, 0, 0)",
          fromVertex: 5,
          toVertex: 4,
          weight: 2,
        },
      ]);
      expect(result.steps[3].kruskalSets).toEqual([[0, 1], [2], [5, 3, 4]]);
    });

    test("Result: last step", () => {
      expect(result.steps[6].vertices.length).toBe(6);
      expect(result.steps[6].sortedEdges.items).toEqual([]);
      for (let i = 0; i < result.steps[6].kruskalSets.length; ++i) {
        for (let j = 1; j < result.steps[6].kruskalSets[i].length; ++j) {
          expect(
            result.steps[6].vertices[result.steps[6].kruskalSets[i][0]].color
          ).toBe(
            result.steps[6].vertices[result.steps[6].kruskalSets[i][j]].color
          );
        }
        for (let j = i + 1; j < result.steps[6].kruskalSets.length; ++j) {
          expect(
            result.steps[6].vertices[result.steps[6].kruskalSets[i][0]].color
          ).not.toBe(
            result.steps[6].vertices[result.steps[6].kruskalSets[j][0]].color
          );
        }
      }
      expect(result.steps[6].chosenEdges).toEqual([
        { color: "rgb(139, 0, 0)", fromVertex: 3, toVertex: 4, weight: 1 },
        { color: "rgb(139, 0, 0)", fromVertex: 0, toVertex: 1, weight: 2 },
        { color: "rgb(139, 0, 0)", fromVertex: 5, toVertex: 4, weight: 2 },
        { color: "rgb(139, 0, 0)", fromVertex: 1, toVertex: 4, weight: 3 },
        { color: "rgb(139, 0, 0)", fromVertex: 2, toVertex: 5, weight: 5 },
      ]);
      expect(result.steps[6].kruskalSets).toEqual([[2, 0, 1, 5, 3, 4]]);
    });
  });

  describe("Test Function: primMST", () => {
    let graphPRIM = {
      directed: false,
      noOfVertices: 6,
      adjList: [
        [
          0,
          [
            { fromVertex: 0, toVertex: 1, weight: 2, color: "rgb(0,0,0)" },
            { fromVertex: 0, toVertex: 3, weight: 4, color: "rgb(0,0,0)" },
          ],
        ],
        [
          1,
          [
            { fromVertex: 1, toVertex: 0, weight: 2, color: "rgb(0,0,0)" },
            { fromVertex: 1, toVertex: 2, weight: 6, color: "rgb(0,0,0)" },
            { fromVertex: 1, toVertex: 4, weight: 3, color: "rgb(0,0,0)" },
            { fromVertex: 1, toVertex: 3, weight: 5, color: "rgb(0,0,0)" },
          ],
        ],
        [
          2,
          [
            { fromVertex: 2, toVertex: 1, weight: 6, color: "rgb(0,0,0)" },
            { fromVertex: 2, toVertex: 4, weight: 6, color: "rgb(0,0,0)" },
            { fromVertex: 2, toVertex: 5, weight: 5, color: "rgb(0,0,0)" },
          ],
        ],
        [
          3,
          [
            { fromVertex: 3, toVertex: 1, weight: 5, color: "rgb(0,0,0)" },
            { fromVertex: 3, toVertex: 4, weight: 1, color: "rgb(0,0,0)" },
            { fromVertex: 3, toVertex: 0, weight: 4, color: "rgb(0,0,0)" },
          ],
        ],
        [
          4,
          [
            { fromVertex: 4, toVertex: 1, weight: 3, color: "rgb(0,0,0)" },
            { fromVertex: 4, toVertex: 3, weight: 1, color: "rgb(0,0,0)" },
            { fromVertex: 4, toVertex: 5, weight: 2, color: "rgb(0,0,0)" },
            { fromVertex: 4, toVertex: 2, weight: 6, color: "rgb(0,0,0)" },
          ],
        ],
        [
          5,
          [
            { fromVertex: 5, toVertex: 4, weight: 2, color: "rgb(0,0,0)" },
            { fromVertex: 5, toVertex: 2, weight: 5, color: "rgb(0,0,0)" },
          ],
        ],
      ],
    };
    graphPRIM.adjList = new Map(graphPRIM.adjList);

    let result = Algorithm.primMST(graphPRIM, 0);

    test("Result: number of steps", () => {
      expect(result.steps.length).toBe(7);
    });

    test("Result: first step", () => {
      expect(result.steps[0].step).toBe(0);
      expect(result.steps[0].vertices.length).toBe(6);
      expect(result.steps[0].vertices[0].color).toBe(Color.WHITE);
      expect(result.steps[0].vertices[1].color).toBe(Color.WHITE);
      expect(result.steps[0].vertices[2].color).toBe(Color.WHITE);
      expect(result.steps[0].vertices[3].color).toBe(Color.WHITE);
      expect(result.steps[0].vertices[4].color).toBe(Color.WHITE);
      expect(result.steps[0].vertices[5].color).toBe(Color.WHITE);
      expect(result.steps[0].currentVertex).toBe(-1);
      expect(result.steps[0].chosenEdges).toEqual([]);
    });

    test("Result: fourth step", () => {
      expect(result.steps[3].vertices.length).toBe(6);
      expect(result.steps[3].vertices[0].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[3].vertices[1].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[3].vertices[2].color).toBe(Color.WHITE);
      expect(result.steps[3].vertices[3].color).toBe(Color.WHITE);
      expect(result.steps[3].vertices[4].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[3].vertices[5].color).toBe(Color.WHITE);
      expect(result.steps[3].step).toBe(3);
      expect(result.steps[3].currentVertex).toBe(4);
      expect(result.steps[3].chosenEdges).toEqual([
        { color: "rgb(139, 0, 0)", fromVertex: 0, toVertex: 1, weight: 2 },
        { color: "rgb(139, 0, 0)", fromVertex: 1, toVertex: 2, weight: 6 },
        { color: "rgb(139, 0, 0)", fromVertex: 1, toVertex: 4, weight: 3 },
        { color: "rgb(139, 0, 0)", fromVertex: 4, toVertex: 3, weight: 1 },
        { color: "rgb(139, 0, 0)", fromVertex: 4, toVertex: 5, weight: 2 },
      ]);
    });

    test("Result: last step", () => {
      expect(result.steps[6].vertices.length).toBe(6);
      expect(result.steps[6].vertices[0].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[6].vertices[1].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[6].vertices[2].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[6].vertices[3].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[6].vertices[4].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[6].vertices[5].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[6].step).toBe(6);
      expect(result.steps[6].currentVertex).toBe(2);
      expect(result.steps[6].chosenEdges).toEqual([
        { color: "rgb(139, 0, 0)", fromVertex: 0, toVertex: 1, weight: 2 },
        { color: "rgb(139, 0, 0)", fromVertex: 1, toVertex: 4, weight: 3 },
        { color: "rgb(139, 0, 0)", fromVertex: 4, toVertex: 3, weight: 1 },
        { color: "rgb(139, 0, 0)", fromVertex: 4, toVertex: 5, weight: 2 },
        { color: "rgb(139, 0, 0)", fromVertex: 5, toVertex: 2, weight: 5 },
      ]);
    });
  });

  describe("Test Function: queueBasedBF", () => {
    test("Test Case: undirected graph error", () => {
      expect(() => {
        Algorithm.queueBasedBF({ directed: false }, 0);
      }).toThrow(
        "The graph has to be directed if using queue based Bellman-Ford algorithm."
      );
    });

    let graphBF = {
      directed: true,
      noOfVertices: 4,
      adjList: [
        [
          0,
          [
            { fromVertex: 0, toVertex: 1, weight: 3, color: "rgb(0,0,0)" },
            { fromVertex: 0, toVertex: 2, weight: 1, color: "rgb(0,0,0)" },
          ],
        ],
        [1, [{ fromVertex: 1, toVertex: 3, weight: -2, color: "rgb(0,0,0)" }]],
        [2, [{ fromVertex: 2, toVertex: 1, weight: -1, color: "rgb(0,0,0)" }]],
        [3, [{ fromVertex: 3, toVertex: 2, weight: 4, color: "rgb(0,0,0)" }]],
      ],
    };
    graphBF.adjList = new Map(graphBF.adjList);

    let result = Algorithm.queueBasedBF(graphBF, 0);

    test("Result: number of steps", () => {
      expect(result.steps.length).toBe(7);
    });

    test("Result: first step", () => {
      expect(result.steps[0].step).toBe(0);
      expect(result.steps[0].vertices.length).toBe(4);
      expect(result.steps[0].vertices[0].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[0].vertices[1].color).toBe(Color.WHITE);
      expect(result.steps[0].vertices[2].color).toBe(Color.WHITE);
      expect(result.steps[0].vertices[3].color).toBe(Color.WHITE);
      expect(result.steps[0].step).toBe(0);
      expect(result.steps[0].round).toBe(null);
      expect(result.steps[0].chosenEdges).toEqual([]);
      expect(result.steps[0].queue.items).toEqual([0]);
    });

    test("Result: fourth step", () => {
      expect(result.steps[4].vertices.length).toBe(4);
      expect(result.steps[4].vertices[0].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[4].vertices[1].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[4].vertices[2].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[4].vertices[3].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[4].step).toBe(4);
      expect(result.steps[4].round).toBe(2);
      expect(result.steps[4].chosenEdges).toEqual([
        { color: "rgb(139, 0, 0)", fromVertex: 0, toVertex: 2, weight: 1 },
        { color: "rgb(139, 0, 0)", fromVertex: 1, toVertex: 3, weight: -2 },
        { color: "rgb(139, 0, 0)", fromVertex: 2, toVertex: 1, weight: -1 },
      ]);
      expect(result.steps[4].queue.items).toEqual([1]);
    });

    test("Result: last step", () => {
      expect(result.steps[6].vertices.length).toBe(4);
      expect(result.steps[6].vertices[0].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[6].vertices[1].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[6].vertices[2].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[6].vertices[3].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[6].step).toBe(6);
      expect(result.steps[6].round).toBe(3);
      expect(result.steps[6].chosenEdges).toEqual([
        { color: "rgb(139, 0, 0)", fromVertex: 0, toVertex: 2, weight: 1 },
        { color: "rgb(139, 0, 0)", fromVertex: 2, toVertex: 1, weight: -1 },
        { color: "rgb(139, 0, 0)", fromVertex: 1, toVertex: 3, weight: -2 },
      ]);
      expect(result.steps[6].queue.items).toEqual([]);
    });
  });

  describe("Test Function: dijkstra", () => {
    test("Test Case: undirected graph error", () => {
      expect(() => {
        Algorithm.dijkstra({ directed: false }, 0);
      }).toThrow("The graph has to be directed if using Dijkstra's algorithm.");
    });
    test("Test Case: undirected graph error", () => {
      expect(() => {
        const graph = {
          directed: true,
          noOfVertices: 5,
          adjList: [
            [
              0,
              [
                {
                  fromVertex: 0,
                  toVertex: 3,
                  weight: -1,
                  color: "rgb(0,0,0)",
                },
                {
                  fromVertex: 0,
                  toVertex: 1,
                  weight: 2,
                  color: "rgb(0,0,0)",
                },
                {
                  fromVertex: 0,
                  toVertex: 2,
                  weight: 4,
                  color: "rgb(0,0,0)",
                },
              ],
            ],
          ],
        };
        graph.adjList = new Map(graph.adjList);
        Algorithm.dijkstra(graph, 0);
      }).toThrow(
        "The edges' weight cannot be negative if using Dijkstra's algorithm."
      );
    });

    let graphDIJKSTRA = {
      directed: true,
      noOfVertices: 5,
      adjList: [
        [
          0,
          [
            { fromVertex: 0, toVertex: 3, weight: 1, color: "rgb(0,0,0)" },
            { fromVertex: 0, toVertex: 1, weight: 2, color: "rgb(0,0,0)" },
            { fromVertex: 0, toVertex: 2, weight: 4, color: "rgb(0,0,0)" },
          ],
        ],
        [1, [{ fromVertex: 1, toVertex: 2, weight: 0, color: "rgb(0,0,0)" }]],
        [2, [{ fromVertex: 2, toVertex: 3, weight: 1, color: "rgb(0,0,0)" }]],
        [3, [{ fromVertex: 3, toVertex: 2, weight: 2, color: "rgb(0,0,0)" }]],
        [
          4,
          [
            { fromVertex: 4, toVertex: 2, weight: 2, color: "rgb(0,0,0)" },
            { fromVertex: 4, toVertex: 3, weight: 3, color: "rgb(0,0,0)" },
          ],
        ],
      ],
    };
    graphDIJKSTRA.adjList = new Map(graphDIJKSTRA.adjList);

    let result = Algorithm.dijkstra(graphDIJKSTRA, 0);

    test("Result: number of steps", () => {
      expect(result.steps.length).toBe(7);
    });

    test("Result: first step", () => {
      expect(result.steps[0].vertices.length).toBe(5);
      expect(result.steps[0].vertices[0].color).toBe(Color.WHITE);
      expect(result.steps[0].vertices[1].color).toBe(Color.WHITE);
      expect(result.steps[0].vertices[2].color).toBe(Color.WHITE);
      expect(result.steps[0].vertices[3].color).toBe(Color.WHITE);
      expect(result.steps[0].vertices[4].color).toBe(Color.WHITE);
      expect(result.steps[0].currentVertex).toBe(null);
      expect(result.steps[0].step).toBe(-1);
      expect(result.steps[0].queue.items).toEqual([0, 1, 2, 3, 4]);
      expect(result.steps[0].chosenEdges).toEqual([]);
    });

    test("Result: fourth step", () => {
      expect(result.steps[3].vertices.length).toBe(5);
      expect(result.steps[3].vertices[0].color).toBe(Color.MENTA);
      expect(result.steps[3].vertices[1].color).toBe(Color.MENTA);
      expect(result.steps[3].vertices[2].color).toBe(Color.LIGHT_BLUE);
      expect(result.steps[3].vertices[3].color).toBe(Color.MENTA);
      expect(result.steps[3].vertices[4].color).toBe(Color.WHITE);
      expect(result.steps[3].currentVertex).toBe(1);
      expect(result.steps[3].step).toBe(2);
      expect(result.steps[3].queue.items).toEqual([2, 4]);
      expect(result.steps[3].chosenEdges).toEqual([
        { color: "rgb(139, 0, 0)", fromVertex: 0, toVertex: 3, weight: 1 },
        { color: "rgb(139, 0, 0)", fromVertex: 0, toVertex: 1, weight: 2 },
        { color: "rgb(139, 0, 0)", fromVertex: 1, toVertex: 2, weight: 0 },
      ]);
    });

    test("Result: last step", () => {
      expect(result.steps[5].vertices.length).toBe(5);
      expect(result.steps[5].vertices[0].color).toBe(Color.MENTA);
      expect(result.steps[5].vertices[1].color).toBe(Color.MENTA);
      expect(result.steps[5].vertices[2].color).toBe(Color.MENTA);
      expect(result.steps[5].vertices[3].color).toBe(Color.MENTA);
      expect(result.steps[5].vertices[4].color).toBe(Color.MENTA);
      expect(result.steps[5].step).toBe(4);
      expect(result.steps[5].currentVertex).toBe(4);
      expect(result.steps[5].queue.items).toEqual([]);
      expect(result.steps[5].chosenEdges).toEqual([
        { color: "rgb(139, 0, 0)", fromVertex: 0, toVertex: 3, weight: 1 },
        { color: "rgb(139, 0, 0)", fromVertex: 0, toVertex: 1, weight: 2 },
        { color: "rgb(139, 0, 0)", fromVertex: 1, toVertex: 2, weight: 0 },
      ]);
    });

    test("Result: end step", () => {
      expect(result.steps[6].vertices.length).toBe(5);
      expect(result.steps[6].vertices[0].color).toBe(Color.MENTA);
      expect(result.steps[6].vertices[1].color).toBe(Color.MENTA);
      expect(result.steps[6].vertices[2].color).toBe(Color.MENTA);
      expect(result.steps[6].vertices[3].color).toBe(Color.MENTA);
      expect(result.steps[6].vertices[4].color).toBe(Color.MENTA);
      expect(result.steps[6].step).toBe(-2);
      expect(result.steps[6].currentVertex).toBe(null);
      expect(result.steps[6].queue.items).toEqual([]);
      expect(result.steps[6].chosenEdges).toEqual([
        { color: "rgb(139, 0, 0)", fromVertex: 0, toVertex: 3, weight: 1 },
        { color: "rgb(139, 0, 0)", fromVertex: 0, toVertex: 1, weight: 2 },
        { color: "rgb(139, 0, 0)", fromVertex: 1, toVertex: 2, weight: 0 },
      ]);
    });
  });

  describe("Test Function: floydWarshall", () => {
    let graphFW = {
      directed: true,
      noOfVertices: 4,
      adjList: [
        [
          0,
          [
            { fromVertex: 0, toVertex: 1, weight: 3, color: "rgb(0,0,0)" },
            { fromVertex: 0, toVertex: 2, weight: 1, color: "rgb(0,0,0)" },
          ],
        ],
        [1, [{ fromVertex: 1, toVertex: 3, weight: -2, color: "rgb(0,0,0)" }]],
        [2, [{ fromVertex: 2, toVertex: 1, weight: -1, color: "rgb(0,0,0)" }]],
        [3, [{ fromVertex: 3, toVertex: 2, weight: 4, color: "rgb(0,0,0)" }]],
      ],
    };
    graphFW.adjList = new Map(graphFW.adjList);

    let result = Algorithm.floydWarshall(graphFW);

    test("Result: number of steps", () => {
      expect(result.steps.length).toBe(7);
    });

    test("Result: first step", () => {
      expect(result.steps[0].vertices.length).toBe(4);
      expect(result.steps[0].distanceMatrix).toEqual([
        [0, 3, 1, null],
        [null, 0, null, -2],
        [null, -1, 0, null],
        [null, null, 4, 0],
      ]);
      expect(result.steps[0].parentMatrix).toEqual([
        [null, 0, 0, null],
        [null, null, null, 1],
        [null, 2, null, null],
        [null, null, 3, null],
      ]);
      expect(result.steps[0].k).toBe(null);
      expect(result.steps[0].i).toBe(null);
      expect(result.steps[0].j).toBe(null);
      for (let i = 0; i < result.steps[0].vertices.length; ++i) {
        if (result.steps[0].k === i)
          expect(result.steps[0].vertices[i].color).toBe(Color.LIGHT_BLUE);
        else if (result.steps[0].i === i)
          expect(result.steps[0].vertices[i].color).toBe(Color.PALE_RED);
        else if (result.steps[0].j === i)
          expect(result.steps[0].vertices[i].color).toBe(Color.GREEN);
        else expect(result.steps[0].vertices[i].color).toBe(Color.WHITE);
      }
    });

    test("Result: fourth step", () => {
      expect(result.steps[3].vertices.length).toBe(4);
      expect(result.steps[3].distanceMatrix).toEqual([
        [0, 0, 1, 1],
        [null, 0, null, -2],
        [null, -1, 0, -3],
        [null, null, 4, 0],
      ]);
      expect(result.steps[3].parentMatrix).toEqual([
        [null, 2, 0, 1],
        [null, null, null, 1],
        [null, 2, null, 1],
        [null, null, 3, null],
      ]);
      expect(result.steps[3].k).toBe(2);
      expect(result.steps[3].i).toBe(0);
      expect(result.steps[3].j).toBe(1);
      for (let i = 0; i < result.steps[3].vertices.length; ++i) {
        if (result.steps[3].k === i)
          expect(result.steps[3].vertices[i].color).toBe(Color.LIGHT_BLUE);
        else if (result.steps[3].i === i)
          expect(result.steps[3].vertices[i].color).toBe(Color.PALE_RED);
        else if (result.steps[3].j === i)
          expect(result.steps[3].vertices[i].color).toBe(Color.GREEN);
        else expect(result.steps[3].vertices[i].color).toBe(Color.WHITE);
      }
    });

    test("Result: last step", () => {
      expect(result.steps[6].vertices.length).toBe(4);
      expect(result.steps[6].distanceMatrix).toEqual([
        [0, 0, 1, -2],
        [null, 0, 2, -2],
        [null, -1, 0, -3],
        [null, 3, 4, 0],
      ]);
      expect(result.steps[6].parentMatrix).toEqual([
        [null, 2, 0, 1],
        [null, null, 3, 1],
        [null, 2, null, 1],
        [null, 2, 3, null],
      ]);
      expect(result.steps[6].k).toBe(3);
      expect(result.steps[6].i).toBe(1);
      expect(result.steps[6].j).toBe(2);
      for (let i = 0; i < result.steps[6].vertices.length; ++i) {
        if (result.steps[6].k === i)
          expect(result.steps[6].vertices[i].color).toBe(Color.LIGHT_BLUE);
        else if (result.steps[6].i === i)
          expect(result.steps[6].vertices[i].color).toBe(Color.PALE_RED);
        else if (result.steps[6].j === i)
          expect(result.steps[6].vertices[i].color).toBe(Color.GREEN);
        else expect(result.steps[6].vertices[i].color).toBe(Color.WHITE);
      }
    });
  });
});
