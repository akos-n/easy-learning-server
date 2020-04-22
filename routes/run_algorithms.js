let algorithms = require("../graph_algorithm_utils/algorithms");

let express = require("express");
let router = express.Router();

router.post("/*", function (req, res, next) {
  req.body.graph.adjList = new Map(req.body.graph.adjList);
  next();
});

router.post("/bfs", function (req, res, next) {
  try {
    res.json(
      JSON.stringify(
        algorithms.Algorithm.bfs(req.body.graph, req.body.selectedVertex)
      )
    );
  } catch (e) {
    res.json(JSON.stringify({ err: e.message }));
  }
});

router.post("/dfs", function (req, res, next) {
  try {
    res.json(JSON.stringify(algorithms.Algorithm.dfs(req.body.graph)));
  } catch (e) {
    res.json(JSON.stringify({ err: e.message }));
  }
});

router.post("/topo", function (req, res, next) {
  try {
    res.json(JSON.stringify(algorithms.Algorithm.topo(req.body.graph)));
  } catch (e) {
    res.json(JSON.stringify({ err: e.message }));
  }
});

router.post("/topo-dfs", function (req, res, next) {
  try {
    res.json(
      JSON.stringify(
        algorithms.Algorithm.topoWithDFS(
          req.body.graph,
          req.body.selectedVertex
        )
      )
    );
  } catch (e) {
    res.json(JSON.stringify({ err: e.message }));
  }
});

router.post("/kruskal", function (req, res, next) {
  try {
    res.json(JSON.stringify(algorithms.Algorithm.kruskalMST(req.body.graph)));
  } catch (e) {
    res.json(JSON.stringify({ err: e.message }));
  }
});

router.post("/prim", function (req, res, next) {
  try {
    res.json(
      JSON.stringify(
        algorithms.Algorithm.primMST(req.body.graph, req.body.selectedVertex)
      )
    );
  } catch (e) {
    res.json(JSON.stringify({ err: e.message }));
  }
});

router.post("/dijkstra", function (req, res, next) {
  try {
    res.json(
      JSON.stringify(
        algorithms.Algorithm.dijkstra(req.body.graph, req.body.selectedVertex)
      )
    );
  } catch (e) {
    res.json(JSON.stringify({ err: e.message }));
  }
});

router.post("/qbbf", function (req, res, next) {
  try {
    res.json(
      JSON.stringify(
        algorithms.Algorithm.queueBasedBF(
          req.body.graph,
          req.body.selectedVertex
        )
      )
    );
  } catch (e) {
    res.json(JSON.stringify({ err: e.message }));
  }
});

router.post("/fw", function (req, res, next) {
  try {
    res.json(
      JSON.stringify(algorithms.Algorithm.floydWarshall(req.body.graph))
    );
  } catch (e) {
    res.json(JSON.stringify({ err: e.message }));
  }
});

module.exports = router;
