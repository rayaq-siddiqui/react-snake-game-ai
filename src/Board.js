import React from "react";
import "./Board.css";
import Tile from "./Tile.js";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.height = this.props.height;
    this.width = this.props.width;
  }

  isSnakeHead(x, y) {
    const head = this.props.position[0];

    if (head[0] === x && head[1] === y) {
      return true;
    }
  }

  arrContainsXY(arr, x, y) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === x && arr[i][1] === y) {
        return true;
      }
    }
    return false;
  }

  createTile(tileId, { type }) {
    if (!type) {
      type = "background";
    }

    let tile = <Tile id={tileId} type={type} />;
    return tile;
  }

  outputRow(rowNum) {
    let row = [];
    for (let i = 0; i < this.width; i++) {
      const type = this.isSnakeHead(i, rowNum)
        ? "snake head"
        : this.arrContainsXY(this.props.position, i, rowNum)
        ? "snake"
        : this.arrContainsXY(this.props.applePos, i, rowNum)
        ? "apple"
        : "background";
      const tile = this.createTile(i, { type: type });
      row.push(tile);
    }

    return (
      <div className="board-row" id={rowNum}>
        {row}
      </div>
    );
  }

  outputBoard() {
    let rows = [];
    for (let i = 0; i < this.height; i++) {
      rows.push(this.outputRow(i));
    }

    return <div className="board">{rows}</div>;
  }

  render() {
    return <div className="border">{this.outputBoard()}</div>;
  }
}
