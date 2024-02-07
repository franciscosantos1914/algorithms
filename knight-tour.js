class KnightTour {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.board = Array.from(Array(boardSize), () => Array(boardSize).fill(-1));
        this.moves = [
            [2, 1],
            [1, 2],
            [-1, 2],
            [-2, 1],
            [-2, -1],
            [-1, -2],
            [1, -2],
            [2, -1]
        ];
    }

    isSafe(x, y) {
        return x >= 0 && y >= 0 && x < this.boardSize && y < this.boardSize && this.board[x][y] === -1;
    }

    countPossibleMoves(x, y) {
        let count = 0;
        for (let move of this.moves) {
            const newX = x + move[0];
            const newY = y + move[1];
            if (this.isSafe(newX, newY)) {
                count++;
            }
        }
        return count;
    }

    getAvailableMoves(x, y) {
        const availableMoves = [];
        for (let move of this.moves) {
            const newX = x + move[0];
            const newY = y + move[1];
            if (this.isSafe(newX, newY)) {
                availableMoves.push([newX, newY]);
            }
        }
        return availableMoves;
    }

    knightTour() {
        this.board[0][0] = 0; // Start from (0, 0)

        // Begin with first move
        if (!this.solveKnightTour(0, 0, 1)) {
            console.log("No solution exists!");
            return [];
        }

        return this.board;
    }

    solveKnightTour(x, y, moveCount) {
        if (moveCount === this.boardSize * this.boardSize) {
            return true; // All squares have been visited
        }

        const availableMoves = this.getAvailableMoves(x, y);
        availableMoves.sort((a, b) => {
            const countA = this.countPossibleMoves(a[0], a[1]);
            const countB = this.countPossibleMoves(b[0], b[1]);
            return countA - countB;
        });

        for (let move of availableMoves) {
            const newX = move[0];
            const newY = move[1];
            this.board[newX][newY] = moveCount;

            if (this.solveKnightTour(newX, newY, moveCount + 1)) {
                return true;
            }

            // Backtrack
            this.board[newX][newY] = -1;
        }

        return false;
    }
}

const boardSize = 8; // 8x8 chessboard
const knightTour = new KnightTour(boardSize);
const solution = knightTour.knightTour();

console.log("Knight's Tour Solution:");
if (solution.length > 0) {
    for (let row of solution) {
        console.log(row);
    }
} else {
    console.log("No solution found!");
}
