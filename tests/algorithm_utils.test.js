let utils = require("../graph_algorithm_utils/algorithm_utils");

describe("Test Class: Stack", () => {
  let stack = new utils.Stack();

  test("Test Method: constructor", () => {
    expect(stack).toBeDefined();
    expect(stack).not.toBeNull();
    expect(stack.isEmpty()).toBeTruthy();
    expect(stack.length()).toBe(0);
    expect(stack.printStack()).toBe("");
  });

  test("Test Method: pop (empty stack)", () => {
    expect(stack.length()).toBe(0);
    expect(() => {
      stack.pop();
    }).toThrow("The stack is empty!");
    expect(stack.length()).toBe(0);
  });

  test("Test Method: push", () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    stack.push(5);
    expect(stack.isEmpty()).toBeFalsy();
    expect(stack.length()).toBe(5);
  });

  test("Test Method: pop", () => {
    expect(stack.length()).toBe(5);
    expect(stack.pop()).toBe(5);
    expect(stack.length()).toBe(4);
  });

  test("Test Method: top", () => {
    expect(stack.length()).toBe(4);
    expect(stack.top()).toBe(4);
    expect(stack.length()).toBe(4);
  });

  test("Test Method: isInStack", () => {
    expect(stack.isInStack(5)).toBeFalsy();
    expect(stack.isInStack(-4)).toBeFalsy();
    expect(stack.isInStack(0)).toBeFalsy();
    expect(stack.isInStack(4)).toBeTruthy();
    expect(stack.isInStack(3)).toBeTruthy();
    expect(stack.isInStack(2)).toBeTruthy();
    expect(stack.isInStack(1)).toBeTruthy();
  });

  test("Test Method: printStack", () => {
    expect(stack.printStack()).toBe("1 2 3 4 ");
  });

  test("Test Method: setEmpty", () => {
    expect(stack.isEmpty()).toBeFalsy();
    expect(stack.length()).toBe(4);
    stack.setEmpty();
    expect(stack.isEmpty()).toBeTruthy();
    expect(stack.length()).toBe(0);
  });
});

describe("Test Class: Queue", () => {
  let queue = new utils.Queue();

  test("Test Method: constructor", () => {
    expect(queue).toBeDefined();
    expect(queue).not.toBeNull();
    expect(queue.isEmpty()).toBeTruthy();
    expect(queue.length()).toBe(0);
  });

  test("Test Method: rem (empty queue)", () => {
    expect(queue.length()).toBe(0);
    expect(() => {
      queue.rem();
    }).toThrow("Queue is empty!");
    expect(queue.length()).toBe(0);
  });

  test("Test Method: first (empty queue)", () => {
    expect(queue.length()).toBe(0);
    expect(() => {
      queue.first();
    }).toThrow("Queue is empty!");
    expect(queue.length()).toBe(0);
  });

  test("Test Method: add", () => {
    queue.add(1);
    queue.add(2);
    queue.add(3);
    queue.add(4);
    queue.add(5);
    expect(queue.isEmpty()).toBeFalsy();
    expect(queue.length()).toBe(5);
  });

  test("Test Method: rem", () => {
    expect(queue.length()).toBe(5);
    expect(queue.rem()).toBe(1);
    expect(queue.length()).toBe(4);
  });

  test("Test Method: first", () => {
    expect(queue.length()).toBe(4);
    expect(queue.first()).toBe(2);
    expect(queue.length()).toBe(4);
  });

  test("Test Method: isInQueue", () => {
    expect(queue.isInQueue(1)).toBeFalsy();
    expect(queue.isInQueue(-4)).toBeFalsy();
    expect(queue.isInQueue(0)).toBeFalsy();
    expect(queue.isInQueue(6)).toBeFalsy();
    expect(queue.isInQueue(5)).toBeTruthy();
    expect(queue.isInQueue(4)).toBeTruthy();
    expect(queue.isInQueue(3)).toBeTruthy();
    expect(queue.isInQueue(2)).toBeTruthy();
  });

  test("Test Method: setEmpty", () => {
    expect(queue.isEmpty()).toBeFalsy();
    expect(queue.length()).toBe(4);
    queue.setEmpty();
    expect(queue.isEmpty()).toBeTruthy();
    expect(queue.length()).toBe(0);
  });
});

describe("Test Class: PriorityQueue", () => {
  describe("Test Case: PriorityQueue with Minimum sort function", () => {
    test("Test Method: constructor with sortByList", () => {
      const tempQueue = new utils.PriorityQueue(() => {
        return true;
      }, [2, 3, 4, 5]);
      expect(tempQueue.sortByList).toEqual([2, 3, 4, 5]);
    });

    let pQueue = new utils.PriorityQueue(
      jest.fn((a, b) => {
        return a > b;
      })
    );

    test("Test Method: constructor", () => {
      expect(pQueue).toBeDefined();
      expect(pQueue).not.toBeNull();
      expect(pQueue.isEmpty()).toBeTruthy();
      expect(pQueue.sortFunction).toBeDefined();
      expect(pQueue.sortFunction).not.toBeNull();
      expect(pQueue.sortByList).toBeNull();
    });

    test("Test Method: remMax (empty queue)", () => {
      expect(pQueue.items.length).toBe(0);
      expect(() => {
        pQueue.remMax();
      }).toThrow("Empty priority queue!");
      expect(pQueue.items.length).toBe(0);
    });

    test("Test Method: remMax (remove last item)", () => {
      expect(pQueue.items.length).toBe(0);
      pQueue.add(0);
      expect(pQueue.items.length).toBe(1);
      expect(pQueue.remMax()).toBe(0);
      expect(pQueue.items.length).toBe(0);
    });

    test("Test Method: max (empty queue)", () => {
      expect(pQueue.items.length).toBe(0);
      expect(() => {
        pQueue.max();
      }).toThrow("Empty priority queue!");
      expect(pQueue.items.length).toBe(0);
    });

    test("Test Method: add", () => {
      pQueue.add(6);
      expect(pQueue.isEmpty()).toBeFalsy();
      expect(pQueue.sortFunction).not.toBeCalled();
      expect(pQueue.items).toEqual([6]);
      pQueue.add(2);
      expect(pQueue.sortFunction).toBeCalledTimes(1);
      expect(pQueue.items).toEqual([2, 6]);
      pQueue.add(4);
      expect(pQueue.sortFunction).toBeCalledTimes(2);
      expect(pQueue.items).toEqual([2, 6, 4]);
      pQueue.add(1);
      expect(pQueue.sortFunction).toBeCalledTimes(4);
      expect(pQueue.items).toEqual([1, 2, 4, 6]);
      pQueue.add(5);
      expect(pQueue.sortFunction).toBeCalledTimes(5);
      expect(pQueue.items).toEqual([1, 2, 4, 6, 5]);
      pQueue.add(3);
      expect(pQueue.sortFunction).toBeCalledTimes(7);
      expect(pQueue.items).toEqual([1, 2, 3, 6, 5, 4]);
      pQueue.add(7);
      expect(pQueue.sortFunction).toBeCalledTimes(8);
      expect(pQueue.items).toEqual([1, 2, 3, 6, 5, 4, 7]);
      expect(pQueue.items.length).toBe(7);
      expect(pQueue.isEmpty()).toBeFalsy();
    });

    test("Test Method: parent", () => {
      expect(pQueue.parent(1)).toBe(0);
      expect(pQueue.parent(4)).toBe(1);
      expect(pQueue.parent(5)).toBe(2);
      expect(pQueue.parent(78)).toBe(38);
    });

    test("Test Method: left", () => {
      expect(pQueue.left(0)).toBe(1);
      expect(pQueue.left(1)).toBe(3);
      expect(pQueue.left(2)).toBe(5);
      expect(pQueue.left(75)).toBe(151);
    });

    test("Test Method: right", () => {
      expect(pQueue.right(0)).toBe(2);
      expect(pQueue.right(1)).toBe(4);
      expect(pQueue.right(2)).toBe(6);
      expect(pQueue.right(75)).toBe(152);
    });

    test("Test Method: setEmpty", () => {
      expect(pQueue.isEmpty()).toBeFalsy();
      pQueue.setEmpty();
      expect(pQueue.isEmpty()).toBeTruthy();
    });

    test("Test Method: buildMaxHeap", () => {
      let newList = [
        437,
        547,
        933,
        180,
        696,
        646,
        708,
        788,
        555,
        329,
        772,
        985,
        504,
        604,
        157,
        793,
        942,
        176,
        919,
        624,
        323,
        203,
        116,
        89,
        106,
        615,
        894,
        775,
        432,
        684,
        972,
        138,
        822,
        107,
        642,
        402,
        85,
        808,
        664,
        958,
        123,
        658,
        492,
        231,
        282,
        68,
        515,
        198,
        802,
        423,
        787,
        288,
        180,
        465,
        524,
        520,
        138,
        868,
        214,
        498,
        699,
        858,
        210,
        787,
        179,
        722,
        608,
        704,
        22,
        990,
        144,
        197,
        254,
        361,
        211,
        458,
        80,
        603,
        722,
        953,
        6,
        288,
        310,
        970,
        104,
        125,
        578,
        906,
        535,
        493,
        446,
        778,
        757,
        818,
        455,
        139,
        5,
        852,
        337,
        838,
      ];
      pQueue.items = utils.copy(newList);
      expect(pQueue.items).toEqual(newList);
      pQueue.buildMaxHeap();
      expect(pQueue.items).not.toEqual(newList);
      for (let i = pQueue.items.length - 1; i > 0; --i) {
        expect(pQueue.items[i]).toBeGreaterThanOrEqual(
          pQueue.items[pQueue.parent(i)]
        );
      }
    });

    test("Test Method: remMax", () => {
      expect(pQueue.items.length).toBe(100);
      expect(pQueue.remMax()).toBe(5);
      expect(pQueue.items.length).toBe(99);
      for (let i = pQueue.items.length - 1; i > 0; --i) {
        expect(pQueue.items[i]).toBeGreaterThanOrEqual(
          pQueue.items[pQueue.parent(i)]
        );
      }
      expect(pQueue.items.length).toBe(99);
      expect(pQueue.remMax()).toBe(6);
      expect(pQueue.items.length).toBe(98);
      for (let i = pQueue.items.length - 1; i > 0; --i) {
        expect(pQueue.items[i]).toBeGreaterThanOrEqual(
          pQueue.items[pQueue.parent(i)]
        );
      }
      expect(pQueue.items.length).toBe(98);
      expect(pQueue.remMax()).toBe(22);
      expect(pQueue.items.length).toBe(97);
      for (let i = pQueue.items.length - 1; i > 0; --i) {
        expect(pQueue.items[i]).toBeGreaterThanOrEqual(
          pQueue.items[pQueue.parent(i)]
        );
      }
    });

    test("Test Method: max", () => {
      expect(pQueue.items.length).toBe(97);
      pQueue.add(17);
      expect(pQueue.items.length).toBe(98);
      expect(pQueue.max()).toBe(17);
      expect(pQueue.items.length).toBe(98);
    });

    test("Test Method: swap", () => {
      expect(pQueue.items[23]).toBe(139);
      expect(pQueue.items[85]).toBe(696);
      pQueue.swap(23, 85);
      expect(pQueue.items[23]).toBe(696);
      expect(pQueue.items[85]).toBe(139);
      pQueue.buildMaxHeap();
    });

    test("Test Method: isInQueue", () => {
      expect(pQueue.isInQueue(5)).toBeFalsy();
      expect(pQueue.isInQueue(22)).toBeFalsy();
      expect(pQueue.isInQueue(0)).toBeFalsy();
      expect(pQueue.isInQueue(-1)).toBeFalsy();
      expect(pQueue.isInQueue(1000)).toBeFalsy();
      expect(pQueue.isInQueue(1250)).toBeFalsy();
      pQueue.add(1250);
      expect(pQueue.isInQueue(1250)).toBeTruthy();
      expect(pQueue.isInQueue(17)).toBeTruthy();
      pQueue.remMax();
      expect(pQueue.isInQueue(17)).toBeFalsy();
    });

    test("Test Method: sink", () => {
      pQueue.buildMaxHeap();

      const biggestChildIndex =
        pQueue.items[pQueue.left(20)] > pQueue.items[pQueue.right(20)]
          ? pQueue.left(20)
          : pQueue.right(20);

      let i20 = utils.copy(pQueue.items[20]);
      let biggestChildOfI20 = utils.copy(pQueue.items[biggestChildIndex]);
      expect(i20).toBe(pQueue.items[20]);
      expect(biggestChildOfI20).toBe(pQueue.items[biggestChildIndex]);
      pQueue.swap(20, biggestChildIndex);
      expect(biggestChildOfI20).toBe(pQueue.items[20]);
      expect(i20).toBe(pQueue.items[biggestChildIndex]);
      pQueue.sink(20);
      expect(i20).toBe(pQueue.items[20]);
      expect(biggestChildOfI20).toBe(pQueue.items[biggestChildIndex]);
    });
  });

  describe("Test Case: PriorityQueue with minimum sort function by attribute of item's class and sortByList", () => {
    let pQueue = new utils.PriorityQueue(
      jest.fn((vertex, other, sortByList) => {
        return (
          (sortByList[vertex].cost === null
            ? Infinity
            : sortByList[vertex].cost) >
          (sortByList[other].cost === null ? Infinity : sortByList[other].cost)
        );
      })
    );
    let vertices = [
      { index: 0, cost: 15 },
      { index: 1, cost: 3 },
      { index: 2, cost: 5 },
      { index: 3, cost: 2 },
      { index: 4, cost: null },
      { index: 5, cost: 4 },
    ];

    test("Test Method: setSortByList", () => {
      expect(pQueue.sortByList).toBeNull();
      pQueue.setSortByList(vertices);
      expect(pQueue.sortByList).not.toBe(vertices);
      expect(pQueue.sortByList).toEqual(vertices);
    });

    test("Test Method: add", () => {
      pQueue.add(0);
      expect(pQueue.sortFunction).not.toBeCalled();
      pQueue.add(1);
      expect(pQueue.sortFunction).toBeCalledTimes(1);
      pQueue.add(2);
      expect(pQueue.sortFunction).toBeCalledTimes(2);
      pQueue.add(3);
      expect(pQueue.sortFunction).toBeCalledTimes(4);
      pQueue.add(4);
      expect(pQueue.sortFunction).toBeCalledTimes(5);
      pQueue.add(5);
      expect(pQueue.sortFunction).toBeCalledTimes(7);
      expect(pQueue.items[0]).toBe(vertices[3].index);

      for (let i = pQueue.items.length - 1; i > 0; --i) {
        const childCost = vertices[pQueue.items[i]].cost
          ? vertices[pQueue.items[i]].cost
          : Infinity;
        const parentCost = vertices[pQueue.items[pQueue.parent(i)]].cost
          ? vertices[pQueue.items[pQueue.parent(i)]].cost
          : Infinity;
        expect(childCost).toBeGreaterThanOrEqual(parentCost);
      }
    });
  });
});

describe("Test Function: copy", () => {
  const copy = utils.copy;
  test("Test Case: Primitives", () => {
    let int = 1235123;
    let copiedInt = copy(int);
    expect(++copiedInt).not.toBe(int);

    let str = "test string";
    let copiedStr = copy(str);
    expect(copiedStr.concat(" changed")).not.toBe(str);
  });

  test("Test Case: Object", () => {
    let object = {
      attr1: 1,
      attr2: "second",
      attr3: [2, 3, 7],
    };
    let copiedObject = copy(object);
    expect(copiedObject).not.toBe(object);
    expect(copiedObject).toEqual(object);
  });
});
