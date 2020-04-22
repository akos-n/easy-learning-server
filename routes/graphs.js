const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const GraphSchema = require("../schemas/GraphSchema");
const db = mongoose.model("graphs", GraphSchema);

router.post("/get", function (req, res, next) {
  console.log(req.body);
  db.findOne(
    {
      $or: [
        { userId: req.body.userId, graphName: req.body.graphName },
        { userId: "guest", graphName: req.body.graphName },
      ],
    },
    "normalGraph directedGraph vertices -_id",
    (err, data) => {
      if (err) res.json(JSON.stringify({ success: false, err: err }));
      else {
        console.log(data);
        if (data !== null) {
          res.json({
            success: true,
            normalGraph: data.normalGraph,
            directedGraph: data.directedGraph,
            vertices: data.vertices,
          });
        } else {
          res.json({ success: false, err: "Graph not found!" });
        }
      }
    }
  );
});

router.post("/get-all-names", function (req, res, next) {
  db.find(
    { $or: [{ userId: req.body.userId }, { userId: "guest" }] },
    "graphName -_id",
    (err, data) => {
      if (err) res.json(JSON.stringify(err));
      else {
        let graphNames = [];
        for (object of data) {
          graphNames.push(object.graphName);
        }
        res.json(JSON.stringify(graphNames));
      }
    }
  );
});

router.post("/save", function (req, res, next) {
  req.body.normalGraph = JSON.stringify(req.body.normalGraph);
  req.body.directedGraph = JSON.stringify(req.body.directedGraph);
  req.body.vertices = JSON.stringify(req.body.vertices);
  console.log(req.body);
  db.create(req.body)
    .then(() => res.json(JSON.stringify({ success: true })))
    .catch((err) => {
      res.json(JSON.stringify({ success: false, err: err }));
    });
});

module.exports = router;
