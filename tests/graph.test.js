const { Color } = require("../graph_algorithm_utils/algorithm_utils");
const { Vertex } = require("../graph_algorithm_utils/graph");

describe("Test Class: Vertex", () => {
  test("Test Function: constructor (default)", () => {
    const vertex = new Vertex();
    expect(vertex.parent).toBe(null);
    expect(vertex.color).toBe(Color.WHITE);
    expect(vertex.depth).toBe(Infinity);
    expect(vertex.cost).toBe(Infinity);
    expect(vertex.distance).toBe(Infinity);
    expect(vertex.discoveryTime).toBe(0);
    expect(vertex.finishingTime).toBe(0);
  });

  test("Test Function: constructor (with values)", () => {
    const vertex = new Vertex(1, null, 5, Color.GRAY, 10, 15, 20, 4, 9);
    expect(vertex.vertexNumber).toBe(1);
    expect(vertex.position).toBeNull();
    expect(vertex.parent).toBe(5);
    expect(vertex.color).toBe(Color.GRAY);
    expect(vertex.depth).toBe(10);
    expect(vertex.cost).toBe(15);
    expect(vertex.distance).toBe(20);
    expect(vertex.discoveryTime).toBe(4);
    expect(vertex.finishingTime).toBe(9);
  });
});
