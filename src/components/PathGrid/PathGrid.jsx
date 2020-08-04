import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Node from './Node/Node'
import './PathGrid.css';
import dijkstra from '../pathAlgo/dijkstra';
import bfs from '../pathAlgo/bfs';
import Button from 'react-bootstrap/Button';


const START_NODE_ROW = 1;
const START_NODE_COL = 1;
const FINISH_NODE_ROW = 9;
const FINISH_NODE_COL = 11;

export default class PathGrid extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      //onMousePressed: false,
    };
  }

  componentDidMount() {
    const grid = getStartGrid();
    this.setState({ grid });
  }


  animateAlgo(visitedNodesInOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const newGrid = this.state.grid.slice();
        const newNode = {
          ...node,
          isVisited: true,
        };
        newGrid[node.row][node.col] = newNode;
        this.setState({ grid: newGrid });
      }, 40 * i);
    }
  }


  visualize() {
    // grid, startnode, finishnode 
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    //call the dikes algorithm 
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    console.log(visitedNodesInOrder);
    this.animateAlgo(visitedNodesInOrder);
  }

  clear() {
    const clearGrid = getStartGrid();
    this.setState({ grid: clearGrid });
  }

  render() {
    const { grid,
      //onMousePressed 
    } = this.state;

    return (
      <>
        <center>
          <Button className="gridControls" onClick={() => { this.visualize() }}>
            Visualize
          </Button>
          <Button className="gridControls" onClick={() => { this.clear() }} variant="secondary">
            Clear
          </Button>
          <div className="grid" style={{ justifyContent: 'center', alignContent: 'center' }}>
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {
                      // row, 
                      // col, 
                      isFinish, isStart, isVisited
                      //isWall 
                    } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        // col={col}
                        // row={row}
                        isFinish={isFinish}
                        isStart={isStart}
                        isVisited={isVisited}
                      // isWall={isWall}
                      // onMousePressed={onMousePressed}
                      // onMouseDown={(row, col) => ({})
                      //   // this.handleMouseDown(row, col)
                      // }
                      // onMouseEnter={(row, col) => ({})
                      //   //  this.handleMouseEnter(row, col)
                      // }
                      // onMouseUp={() => ({})
                      //   // this.handleMouseUp()
                      // }
                      >
                      </Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </center>
      </>
    );

  }
}

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity
  };
};

const getStartGrid = () => {
  const grid = [];
  for (let row = 0; row < 14; row++) {
    const currentRow = [];
    for (let col = 0; col < 14; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
}; 
