import { Board } from './Board';
import { Figure, FigureNames } from './figures/figure';
import { Colors } from './Colors';
import { Queen } from './figures/Queen';
export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean;
    id: number;

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.available = false;
        this.board = board;
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.id = Math.random();
    }

    moveFigure(target: Cell) {
        if (this.figure?.canMove(target)) {
            if (this.figure.name === FigureNames.PAWN && (target.x === 0 || target.x === 7)) {
                new Queen(this, this.figure.color);
            }
            this.figure.moveFigure(target);

            target.figure = this.figure;

            this.figure = null;
        }
    }

    isEmpty(): boolean {
        return this.figure === null;
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) return false;

        const min = Math.min(target.y, this.y);
        const max = Math.max(target.y, this.y);

        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false;
            }
        }

        return true;
    }
    isEmptyHotizontal(target: Cell): boolean {
        if (this.y !== target.y) return false;

        const min = Math.min(target.x, this.x);
        const max = Math.max(target.x, this.x);

        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false;
            }
        }
        return true;
    }
    isEmptyDiagonal(target: Cell): boolean {
        if (Math.abs(this.x - target.x) !== Math.abs(this.y - target.y)) return false;

        const dx = this.x < target.x ? 1 : -1;
        const dy = this.y < target.y ? 1 : -1;

        for (let i = 1; i < Math.abs(this.x - target.x); i++) {
            if (!this.board.getCell(this.x + i * dx, this.y + i * dy).isEmpty()) return false;
        }

        return true;
    }

    isEnemy(target: Cell): boolean {
        if (target.figure) {
            if (this.figure?.color !== target.figure?.color) return true;
        }
        return false;
    }
}
