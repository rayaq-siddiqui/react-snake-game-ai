import React from "react";
import "./stylesheet/Game.css";
import Board from "./Board";
import AStarAlgorithm from "./AStarAlgorithm";

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    // we are going to have a 40x40 grid
    // position contains snake position in order from head to tail
    // for the 40x40 grid and the positions will be in objects {x, y}
    this.width = 40;
    this.height = 40;
    this.prevDirection = null;

    const initialLength = 1;
    const initialPosition = [
      [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)],
    ]; // first entry is head
    this.state = {
      position: initialPosition,
      applePos: [
        [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)],
      ],
      // this is being passed to print out
      board: null,
      snakeLength: initialLength,
      direction: null,
      speed: 100,
      score: `Score: ${initialLength}`,
    };

    this.aStarAlgorithm = new AStarAlgorithm(this.width, this.height);
    this.aiMoveWent = true;
    this.nextMove = null;
  }

  componentDidMount() {
    const currentInterval = setInterval(() => {
      // ai or human aspect
      // this.humanPlay();
      this.aiPlay();

      // mandatory to make the game run stuff
      if (this.snakeCollidedWithApple()) {
        this.increaseSize();
        this.randomizeApplePos();
      }
      this.setState({
        board: (
          <Board
            position={this.state.position}
            applePos={this.state.applePos}
            width={this.width}
            height={this.height}
          />
        ),
      });
      if (this.outOfBounds() || this.tailCollision()) {
        this.updateScore(`Game Over! Final Score: ${this.state.snakeLength}`);
        clearInterval(currentInterval);
      }
    }, this.state.speed);

    document.onkeydown = this.onkeydown;
  }

  onkeydown = (e) => {
    e = e || window.event;

    switch (e.keyCode) {
      case 38: {
        // UP
        this.setState({ direction: "UP" });
        break;
      }
      case 40: {
        // DOWN
        this.setState({ direction: "DOWN" });
        break;
      }
      case 37: {
        // LEFT
        this.setState({ direction: "LEFT" });
        break;
      }
      case 39: {
        // RIGHT
        this.setState({ direction: "RIGHT" });
        break;
      }
      default:
        break;
    }
  };

  humanPlay = () => {
    this.moveSnake();
  };

  aiPlay = () => {
    // build array holding information
    let infoArr = [];

    const board_rows = document.getElementsByClassName("board-row");

    for (const board_row of board_rows) {
      let classNames = [];
      const tiles = board_row.getElementsByClassName("tile");
      for (const tile of tiles) {
        const className = tile.className.replace("tile ", "");
        classNames.push(className);
      }
      infoArr.push(classNames);
    }

    if (this.aiMoveWent) {
      this.nextPosition = this.aStarAlgorithm.runAlgorithm(infoArr);
      if (this.nextPosition) {
        this.aiMoveWent = false;
      }
    }

    if (this.nextPosition) {
      let pos = [...this.state.position];
      pos.unshift([this.nextPosition.x, this.nextPosition.y]);
      if (pos.length > this.state.snakeLength) {
        pos.pop();
      }
      this.setState({ position: pos });
      this.aiMoveWent = true;
    }
  };

  snakeCollidedWithApple = () => {
    const snakePos = this.state.position;
    const applePos = this.state.applePos;
    for (let i = 0; i < snakePos.length; i++) {
      for (let j = 0; j < applePos.length; j++) {
        if (
          snakePos[i][0] === applePos[j][0] &&
          snakePos[i][1] === applePos[j][1]
        ) {
          return true;
        }
      }
    }
    return false;
  };

  tailCollision = () => {
    const snakePos = this.state.position;
    for (let i = 0; i < snakePos.length; i++) {
      for (let j = i + 1; j < snakePos.length; j++) {
        if (
          snakePos[i][0] === snakePos[j][0] &&
          snakePos[i][1] === snakePos[j][1]
        ) {
          return true;
        }
      }
    }
    return false;
  };

  outOfBounds = () => {
    const snakePosHead = this.state.position[0];
    if (
      snakePosHead[0] < 0 ||
      snakePosHead[0] > this.width ||
      snakePosHead[1] < 0 ||
      snakePosHead[1] > this.height
    ) {
      return true;
    }
    return false;
  };

  increaseSize = () => {
    const newLength = this.state.snakeLength + 1;
    this.setState({ snakeLength: newLength });
    this.updateScore(`Score: ${newLength}`);
  };

  updateScore = (newScore) => {
    this.setState({ score: newScore });
  };

  randomizeApplePos = () => {
    this.setState({
      applePos: [
        [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)],
      ],
    });
  };

  moveSnake = () => {
    if (!this.state.direction || !this.state.position) {
      return;
    }

    let pos = [...this.state.position];
    let newHeadPosition = null;
    const x = pos[0][0];
    const y = pos[0][1];
    switch (this.state.direction) {
      case "UP": {
        newHeadPosition = [x, y - 1];
        break;
      }
      case "DOWN": {
        newHeadPosition = [x, y + 1];
        break;
      }
      case "LEFT": {
        newHeadPosition = [x - 1, y];
        break;
      }
      case "RIGHT": {
        newHeadPosition = [x + 1, y];
        break;
      }
      default:
        break;
    }

    pos.unshift([...newHeadPosition]);
    if (pos.length > this.state.snakeLength) {
      pos.pop();
    }
    this.setState({ position: pos });
  };

  render() {
    return (
      <div className="game-container">
        <h1 className="title">Snake Game</h1>
        <h1 className="title">{this.state.score}</h1>
        {this.state.board}
      </div>
    );
  }
}
