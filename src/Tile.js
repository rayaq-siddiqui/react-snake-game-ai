import React from "react";
import "./Tile.css";

export default class Tile extends React.Component {
  render() {
    return <div id={this.props.id} className={"tile " + this.props.type}></div>;
  }
}
