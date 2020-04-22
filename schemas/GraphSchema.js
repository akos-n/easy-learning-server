const mongoose = require("mongoose");

const GraphSchema = mongoose.Schema({
  userId: { type: String },
  graphName: { type: String },
  vertices: { type: String },
  normalGraph: { type: String },
  directedGraph: { type: String },
});

module.exports = GraphSchema;
