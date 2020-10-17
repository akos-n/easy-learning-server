let Color = require("./algorithm_utils").Color;

class Position {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Vertex {
  constructor(
    vertexNumber = null,
    position = new Position(),
    parent = null,
    color = Color.WHITE,
    depth = Infinity,
    cost = Infinity,
    distance = Infinity,
    discoveryTime = 0,
    finishingTime = 0
  ) {
    this.vertexNumber = vertexNumber;
    this.position = position;
    this.parent = parent;
    this.color = color;
    this.depth = depth;
    this.cost = cost;
    this.distance = distance;
    this.discoveryTime = discoveryTime;
    this.finishingTime = finishingTime;
  }
}

exports.Vertex = Vertex;
