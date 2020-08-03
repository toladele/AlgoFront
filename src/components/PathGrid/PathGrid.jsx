import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Node from './Node/Node'
import './PathGrid.css';
import dijkstra, { getNodesInShortestPathOrder } from '../pathAlgo/dijkstra';
import Button from 'react-bootstrap/Button';


const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;

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


  animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node visited-node';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node shortest-path-node';
      }, 50 * i);
    }
  }


  visualize() {
    // grid, startnode, finishnode 
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    //call the dikes algorithm 
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    console.log(visitedNodesInOrder);
    this.animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  clear() {
    const clearGrid = getStartGrid();
    this.setState({ grid: clearGrid });
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        if (row === START_NODE_ROW && col === START_NODE_COL){
          document.getElementById(`node-${row}-${col}`).className =
          'node start-node';
        } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL){
          document.getElementById(`node-${row}-${col}`).className =
          'node finish-node';
        } else {
          document.getElementById(`node-${row}-${col}`).className =
          'node ';
        }
      }
    }
  }

  render() {
    const { grid
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
                      row, 
                      col, 
                      isFinish, isStart, isVisited} = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        row={row}
                        isFinish={isFinish}
                        isStart={isStart}
                        isVisited={isVisited}
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
    distance: Infinity,
    isVisited: false,
    previousNode: null,
  };
};

const getStartGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
}; 
