class Node {
  constructor(x, y, className, { chainLength } = {}) {
    this.x = x;
    this.y = y;
    this.className = className;
    this.chainLength = chainLength;
    this.checked = false;
    this.prevNode = null;
  }
}

export default class AStarAlgorithm {
  constructor(width, height) {
    this.infoArr = null;
    this.width = width;
    this.height = height;
    this.snakeHeadLocation = {};
    this.appleLocation = {};

    // holds all of the nodes for the algorithm
    this.infoArrNodes = [];
    this.nodeList = [];

    // follow path
    this.currentPath = [];
  }

  // run this first to find the locations
  findSnakeHeadAndAppleLocation = () => {
    let snakeHeadNode, appleNode;
    let rowVal = 0,
      colVal = 0;

    for (const row of this.infoArrNodes) {
      for (const val of row) {
        if (val.className === "snake head") {
          snakeHeadNode = this.infoArrNodes[rowVal][colVal];
          this.infoArrNodes[rowVal][colVal].checked = true;
          this.infoArrNodes[rowVal][colVal].chainLength = 0;
        } else if (val.className === "apple") {
          appleNode = this.infoArrNodes[rowVal][colVal];
        }
        colVal++;
      }
      colVal = 0;
      rowVal++;
    }

    return { snakeHeadNode, appleNode };
  };

  convertInfoArrToNodes = () => {
    let rowVal = 0,
      colVal = 0;
    let infoArrNodes = [];
    for (const row of this.infoArr) {
      let tempRowArr = [];
      for (const val of row) {
        const newNode = new Node(colVal, rowVal, val);
        tempRowArr.push(newNode);
        colVal++;
      }
      colVal = 0;
      rowVal++;
      infoArrNodes.push(tempRowArr);
    }
    this.infoArrNodes = infoArrNodes;
  };

  findValidSurroundingEligibleNodes = (inputNode) => {
    const nodeX = inputNode.x;
    const nodeY = inputNode.y;
    let x, y;

    if (nodeX - 1 >= 0) {
      x = nodeX - 1;
      y = nodeY;
      if (
        !this.infoArrNodes[y][x].checked &&
        (this.infoArrNodes[y][x].className === "background" ||
          this.infoArrNodes[y][x].className === "apple")
      ) {
        this.nodeList.push(this.infoArrNodes[y][x]);
        this.infoArrNodes[y][x].checked = true;
      }
    }
    if (nodeX + 1 < this.width) {
      x = nodeX + 1;
      y = nodeY;
      if (
        !this.infoArrNodes[y][x].checked &&
        (this.infoArrNodes[y][x].className === "background" ||
          this.infoArrNodes[y][x].className === "apple")
      ) {
        this.nodeList.push(this.infoArrNodes[y][x]);
        this.infoArrNodes[y][x].checked = true;
      }
    }
    if (nodeY - 1 >= 0) {
      x = nodeX;
      y = nodeY - 1;
      if (
        !this.infoArrNodes[y][x].checked &&
        (this.infoArrNodes[y][x].className === "background" ||
          this.infoArrNodes[y][x].className === "apple")
      ) {
        this.nodeList.push(this.infoArrNodes[y][x]);
        this.infoArrNodes[y][x].checked = true;
      }
    }
    if (nodeY + 1 < this.height) {
      x = nodeX;
      y = nodeY + 1;
      if (
        !this.infoArrNodes[y][x].checked &&
        (this.infoArrNodes[y][x].className === "background" ||
          this.infoArrNodes[y][x].className === "apple")
      ) {
        this.nodeList.push(this.infoArrNodes[y][x]);
        this.infoArrNodes[y][x].checked = true;
      }
    }
  };

  findValidSafetyNode = (inputNode) => {
    const nodeX = inputNode.x;
    const nodeY = inputNode.y;
    let x, y;

    let nodes = [];

    if (nodeX - 1 >= 0) {
      x = nodeX - 1;
      y = nodeY;
      if (
        this.infoArrNodes[y][x].className === "background" ||
        this.infoArrNodes[y][x].className === "apple"
      ) {
        nodes.push(this.infoArrNodes[y][x]);
      }
    }
    if (nodeX + 1 < this.width) {
      x = nodeX + 1;
      y = nodeY;
      if (
        this.infoArrNodes[y][x].className === "background" ||
        this.infoArrNodes[y][x].className === "apple"
      ) {
        nodes.push(this.infoArrNodes[y][x]);
      }
    }
    if (nodeY - 1 >= 0) {
      x = nodeX;
      y = nodeY - 1;
      if (
        this.infoArrNodes[y][x].className === "background" ||
        this.infoArrNodes[y][x].className === "apple"
      ) {
        nodes.push(this.infoArrNodes[y][x]);
      }
    }
    if (nodeY + 1 < this.height) {
      x = nodeX;
      y = nodeY + 1;
      if (
        this.infoArrNodes[y][x].className === "background" ||
        this.infoArrNodes[y][x].className === "apple"
      ) {
        nodes.push(this.infoArrNodes[y][x]);
      }
    }

    console.log(nodes);

    const returnNode = nodes[Math.floor(Math.random() * nodes.length)];
    return returnNode;
  };

  findValidSurroundingCheckedNodesWithLowestChainLength = (inputNode) => {
    const nodeX = inputNode.x;
    const nodeY = inputNode.y;
    let x, y;

    let checkedNodes = [];

    if (nodeX - 1 >= 0) {
      x = nodeX - 1;
      y = nodeY;
      if (
        this.infoArrNodes[y][x].checked &&
        this.infoArrNodes[y][x].chainLength !== undefined
      ) {
        checkedNodes.push(this.infoArrNodes[y][x]);
      }
    }
    if (nodeX + 1 < this.width) {
      x = nodeX + 1;
      y = nodeY;
      if (
        this.infoArrNodes[y][x].checked &&
        this.infoArrNodes[y][x].chainLength !== undefined
      ) {
        checkedNodes.push(this.infoArrNodes[y][x]);
      }
    }
    if (nodeY - 1 >= 0) {
      x = nodeX;
      y = nodeY - 1;
      if (
        this.infoArrNodes[y][x].checked &&
        this.infoArrNodes[y][x].chainLength !== undefined
      ) {
        checkedNodes.push(this.infoArrNodes[y][x]);
      }
    }
    if (nodeY + 1 < this.height) {
      x = nodeX;
      y = nodeY + 1;
      if (
        this.infoArrNodes[y][x].checked &&
        this.infoArrNodes[y][x].chainLength !== undefined
      ) {
        checkedNodes.push(this.infoArrNodes[y][x]);
      }
    }

    const lowestChainLengthNode = checkedNodes.sort((node1, node2) => {
      return node1.chainLength - node2.chainLength;
    })[0];

    return lowestChainLengthNode;
  };

  // TO BE IMPLEMENTED LATER
  // will sort based on the heuristic calculations
  sortNodeList = () => {};

  runAlgorithm = (infoArr) => {
    this.infoArr = infoArr;
    this.convertInfoArrToNodes();

    const { snakeHeadNode, appleNode } = this.findSnakeHeadAndAppleLocation();

    if (snakeHeadNode && appleNode) {
      this.findValidSurroundingEligibleNodes(snakeHeadNode);
      this.sortNodeList();

      let pathFound = false;

      while (!pathFound && this.nodeList.length > 0) {
        const curNodeLocation = this.nodeList.shift();
        let curNode = this.infoArrNodes[curNodeLocation.y][curNodeLocation.x];

        // doing the linked list functionality
        const lowestChainLengthNode =
          this.findValidSurroundingCheckedNodesWithLowestChainLength(curNode);

        if (lowestChainLengthNode) {
          this.infoArrNodes[curNode.y][curNode.x].prevNode =
            this.infoArrNodes[lowestChainLengthNode.y][lowestChainLengthNode.x];
          this.infoArrNodes[curNode.y][curNode.x].chainLength =
            this.infoArrNodes[lowestChainLengthNode.y][lowestChainLengthNode.x]
              .chainLength + 1;

          curNode = this.infoArrNodes[curNode.y][curNode.x];
          if (curNode.className === "apple") {
            pathFound = true;
          }
          this.findValidSurroundingEligibleNodes(curNode);
        }
      }

      const path = [];
      if (pathFound) {
        let previousNode = this.infoArrNodes[appleNode.y][appleNode.x];
        while (previousNode) {
          path.push({ x: previousNode.x, y: previousNode.y });
          previousNode = previousNode.prevNode;
        }
      }
      // what to do if no path is found? give it some node to move it
      else {
        // need to add two potential to path cause of the upcoming pop
        let currentSnakeHead =
          this.infoArrNodes[snakeHeadNode.y][snakeHeadNode.x];
        const safetyNode = this.findValidSafetyNode(currentSnakeHead);
        // console.log(safetyNode);
        let nextPosition = null;
        if (safetyNode) {
          nextPosition = { x: safetyNode.x, y: safetyNode.y };
          path.push(nextPosition);
          path.push(nextPosition);
        }

        // let random = Math.random();
        // let nextPosition = null;
        // if (random < 0.25) {
        //   // up
        //   nextPosition = { x: currentSnakeHead.x, y: currentSnakeHead.y - 1 };
        // } else if (random < 0.5) {
        //   // down
        //   nextPosition = { x: currentSnakeHead.x, y: currentSnakeHead.y + 1 };
        // } else if (random < 0.75) {
        //   // left
        //   nextPosition = { x: currentSnakeHead.x - 1, y: currentSnakeHead.y };
        // } else if (random < 1) {
        //   // right
        //   nextPosition = { x: currentSnakeHead.x + 1, y: currentSnakeHead.y };
        // }
      }

      if (path) {
        this.currentPath = path;
      }

      // remove the snake head node
      this.currentPath.pop();
    }

    const nextMove = this.currentPath.pop();
    return nextMove;
  };
}
