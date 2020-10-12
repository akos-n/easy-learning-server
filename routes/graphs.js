const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const GraphSchema = require("../schemas/GraphSchema");
const db = mongoose.model("graphs", GraphSchema);

router.post("/get", function (req, res, next) {
  db.findOne(
    {
      $or: [
        { userId: req.body.userId, graphName: req.body.graphName },
        { userId: "guest", graphName: req.body.graphName },
      ],
    },
    "normalGraph directedGraph vertices -_id",
    (err, data) => {
      if (err)
        res.json(
          JSON.stringify({
            success: false,
            err: "Something went wrong. Please try again later!",
          })
        );
      else {
        if (data !== null) {
          res.json({
            success: true,
            normalGraph: data.normalGraph,
            directedGraph: data.directedGraph,
            vertices: data.vertices,
          });
        } else {
          res.json(
            JSON.stringify({
              success: false,
              err: "Graph not found in the database!",
            })
          );
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
      if (err)
        res.json(
          JSON.stringify({
            success: false,
            err:
              "Something went wrong and the application couldn't access the loadable graphs' names!",
          })
        );
      else {
        let graphNames = [];
        for (object of data) {
          graphNames.push(object.graphName);
        }
        res.json(JSON.stringify({ success: true, graphNames: graphNames }));
      }
    }
  );
});

router.post("/save", function (req, res, next) {
  db.findOne(
    {
      $or: [
        { userId: req.body.userId, graphName: req.body.graphName },
        { userId: "guest", graphName: req.body.graphName },
      ],
    },
    "_id",
    (err, data) => {
      if (err)
        res.json(
          JSON.stringify({
            success: false,
            err: "Something went wrong. Please try again later!",
          })
        );
      else {
        if (data !== null) {
          res.json(
            JSON.stringify({
              success: false,
              err: "Graph with the given name is already exists!",
            })
          );
        } else {
          req.body.normalGraph = JSON.stringify(req.body.normalGraph);
          req.body.directedGraph = JSON.stringify(req.body.directedGraph);
          req.body.vertices = JSON.stringify(req.body.vertices);

          db.create(req.body)
            .then(() => res.json(JSON.stringify({ success: true })))
            .catch((err) => {
              res.json(
                JSON.stringify({
                  success: false,
                  err: "Something went wrong. Please try again later!",
                })
              );
            });
        }
      }
    }
  );
});

module.exports = router;
