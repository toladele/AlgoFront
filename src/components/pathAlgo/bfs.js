function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}


export default function bfs(grid, startNode, finishNode) {

    var queue = [];
    let visited = [];

    queue.push(startNode);

    const gridRow = grid.length;
    const gridCol = grid[0].length;

    const unvisitedNodes = getAllNodes(grid);

    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, 1, -1];


    while (queue.length) {
        var currentNode = queue.shift();
        var neighbors = [];
        visited.push(currentNode);

        console.log(visited.length);
        console.log(queue.length);

        if (currentNode === finishNode) {
            return visited;
        }


        for (var node1 of unvisitedNodes) {
            for (var i = 0; i < 4; i++) {
                var r = currentNode.row + dr[i];
                var c = currentNode.col + dc[i];

                if (0 < r < gridRow && 0 < c < gridCol) {
                    if (node1.row === r) {
                        if (node1.col === c) {
                            if (!visited.includes(node1)) {
                                neighbors.push(node1);
                            }
                        }
                    }
                }
            }

        }

        for (var neighbor of neighbors) {
            if (!visited.includes(neighbor)) {
                queue.push(neighbor);
                neighbor.parent = currentNode;
            }
        }
    }
}


