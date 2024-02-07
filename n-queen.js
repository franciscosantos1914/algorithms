function isSafe(board, row, col, n) {
    // Check left side of the current row
    for (let i = 0; i < col; i++) {
        if (board[row][i] === 1) {
            return false;
        }
    }

    // Check upper diagonal on left side
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) {
            return false;
        }
    }

    // Check lower diagonal on left side
    for (let i = row, j = col; i < n && j >= 0; i++, j--) {
        if (board[i][j] === 1) {
            return false;
        }
    }

    return true;
}

function solveNQueensUtil(board, col, n, result) {
    if (col === n) {
        // All queens are placed successfully
        // Convert board into a result format and push into the result array
        let temp = [];
        for (let i = 0; i < n; i++) {
            let row = "";
            for (let j = 0; j < n; j++) {
                row += (board[i][j] === 1) ? 'Q' : '.';
            }
            temp.push(row);
        }
        result.push(temp);
        return true;
    }

    let res = false;
    for (let i = 0; i < n; i++) {
        if (isSafe(board, i, col, n)) {
            board[i][col] = 1; // Place queen

            // Recur to place the rest of the queens
            res = solveNQueensUtil(board, col + 1, n, result) || res;

            // If placing queen in board[i][col] doesn't lead to a solution,
            // then remove queen from board[i][col]
            board[i][col] = 0; // Backtrack
        }
    }

    return res;
}

function solveNQueens(n) {
    let result = [];
    let board = Array.from(Array(n), () => Array(n).fill(0));

    if (!solveNQueensUtil(board, 0, n, result)) {
        return []; // No solution exists
    }

    return result;
}

const solutions = solveNQueens(4);
console.log(`Number of solutions for 4-queens problem: ${solutions.length}`);
console.log("Solutions:");
solutions.forEach(solution => {
    solution.forEach(row => console.log(row));
    console.log("\n");
});
