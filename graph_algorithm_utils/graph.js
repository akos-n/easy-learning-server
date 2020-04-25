let Color = require("./algorithm_utils").Color;

class Vertex {
  constructor(
    parent = null,
    color = Color.WHITE,
    depth = Infinity,
    cost = Infinity,
    distance = Infinity,
    discoveryTime = 0,
    finishingTime = 0
  ) {
    this.depth = depth;
    this.parent = parent;
    this.color = color;
    this.cost = cost;
    this.distance = distance;
    this.discoveryTime = discoveryTime;
    this.finishingTime = finishingTime;
  }
}

exports.Vertex = Vertex;
