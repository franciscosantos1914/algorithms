function solveMaze(maze, start, end) {
    const rows = maze.length;
    const cols = maze[0].length;
    const visited = Array.from(Array(rows), () => new Array(cols).fill(false));
    const path = [];

    const isSafe = (row, col) => {
        return row >= 0 && row < rows && col >= 0 && col < cols && maze[row][col] === 1 && !visited[row][col];
    };

    const dfs = (row, col) => {
        if (row === end[0] && col === end[1]) {
            path.push([row, col]);
            return true;
        }

        if (isSafe(row, col)) {
            visited[row][col] = true;
            path.push([row, col]);

            // Try moving in all four directions
            if (dfs(row + 1, col) || dfs(row - 1, col) || dfs(row, col + 1) || dfs(row, col - 1)) {
                return true;
            }

            // Backtrack if no path found from this cell
            path.pop();
        }

        return false;
    };

    if (!dfs(start[0], start[1])) {
        return []; // No solution found
    }

    return path;
}

const maze = [
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1]
];
const end = [4, 4];
const start = [0, 0];

const solution = solveMaze(maze, start, end);
if (solution.length > 0) {
    console.log("Solution path:");
    solution.forEach(coord => console.log(coord));
} else {
    console.log("No solution found.");
}
