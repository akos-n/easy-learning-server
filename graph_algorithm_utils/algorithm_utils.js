class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) throw new Error("The stack is empty!");
    return this.items.pop();
  }

  top() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  isInStack(item) {
    return this.items.includes(item);
  }

  length() {
    return this.items.length;
  }

  setEmpty() {
    this.items = [];
  }

  printStack() {
    let str = "";
    for (let i = 0; i < this.items.length; i++) {
      str += this.items[i] + " ";
    }
    return str;
  }
}

class Queue {
  constructor() {
    this.items = [];
  }

  add(element) {
    this.items.push(element);
  }

  rem() {
    if (this.isEmpty()) throw new Error("Queue is empty!");
    return this.items.shift();
  }

  first() {
    if (this.isEmpty()) throw new Error("Queue is empty!");
    return this.items[0];
  }

  length() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  setEmpty() {
    this.items = [];
  }

  isInQueue(item) {
    return this.items.includes(item);
  }
}

class PriorityQueue {
  constructor(sortFunction, sortByList = []) {
    this.items = [];
    this.sortFunction = sortFunction;
    this.sortByList = sortByList.length === 0 ? null : copy(sortByList);
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  left(i) {
    return 2 * i + 1;
  }

  right(i) {
    return this.left(i) + 1;
  }

  add(item) {
    let j = this.items.length;
    this.items[j] = item;
    let i = this.parent(j);
    while (
      j > 0 &&
      this.sortFunction(this.items[i], this.items[j], this.sortByList)
    ) {
      this.swap(i, j);
      j = i;
      i = this.parent(i);
    }
  }

  buildMaxHeap() {
    for (let i = this.parent(this.items.length - 1); i >= 0; --i) {
      this.sink(i);
    }
  }

  setSortByList(sortByList) {
    this.sortByList = copy(sortByList);
    this.buildMaxHeap();
  }

  remMax() {
    if (this.isEmpty()) throw new Error("Empty priority queue!");
    let max = this.items[0];
    if (this.items.length > 1) this.items[0] = this.items.pop();
    else this.items.pop();
    this.sink(0);
    return max;
  }

  max() {
    if (this.isEmpty()) throw new Error("Empty priority queue!");
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  setEmpty() {
    this.items = [];
  }

  swap(i, j) {
    let tempItem = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = tempItem;
  }

  isInQueue(item) {
    return this.items.includes(item);
  }

  sink(k) {
    let i = k;
    let j = this.left(k);
    let b = true;
    while (j < this.items.length && b) {
      if (
        j < this.items.length - 1 &&
        this.sortFunction(this.items[j], this.items[j + 1], this.sortByList)
      ) {
        j++;
      }
      if (this.sortFunction(this.items[i], this.items[j], this.sortByList)) {
        this.swap(i, j);
        i = j;
        j = this.left(j);
      } else {
        b = false;
      }
    }
  }
}

const Color = {
  WHITE: "rgb(248,248,255)",
  GRAY: "rgb(105,105,105)",
  RED: "rgb(255,0,0)",
  PALE_RED: "rgb(205,65,65)",
  GREEN: "rgb(0, 128, 0)",
  BLACK: "rgb(0,0,0)",
};

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

exports.Stack = Stack;
exports.Queue = Queue;
exports.PriorityQueue = PriorityQueue;
exports.Color = Color;
exports.copy = copy;
