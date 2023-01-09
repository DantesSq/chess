import { Colors } from '../Colors';
import logo from '../../assets/black-bishop.svg';
import { Cell } from '../Cell';

export enum FigureNames {
    FIGURE = 'Figure',
    KING = 'King',
    QUEEN = 'Queen',
    BISHOP = 'Bishop',
    KNIGHT = 'Knight',
    PAWN = 'Pawn',
    ROOK = 'Rook',
}

export class Figure {
    [x: string]: any;
    color: Colors;

    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;
    isFirstStep: boolean;
    isAttacked: boolean;

    constructor(cell: Cell, color: Colors) {
        this.cell = cell;
        this.cell.figure = this;
        this.color = color;

        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
        this.isFirstStep = true;
        this.isAttacked = false;
    }

    canMove(target: Cell): boolean {
        if (target.figure?.color === this.color) return false;
        return true;
    }

    moveFigure(target: Cell): boolean {
        if (target.figure) target.figure.color = this.color;
        this.cell = target;

        this.isFirstStep = false;
        return true;
    }

    getKing(color: Colors): Cell {
        for (let i = 0; i < this.cell.board.cells.length; i++) {
            const row = this.cell.board.cells[i];
            for (let j = 0; j < row.length; j++) {
                if (row[j].figure)
                    if (
                        row[j].figure?.name === FigureNames.KING &&
                        row[j].figure?.color === color
                    ) {
                        const kingCell = row[j];
                        return kingCell;
                    }
            }
        }
        return this.cell;
    }

    canMoveCheck(target: Cell): boolean {
        const thisFigure = this.cell.figure;
        const targetFigure = target.figure;
        const king = this.getKing(this.color);
        target.figure = thisFigure;
        this.cell.figure = null;

        if (!king.figure?.isCheck(king)) {
            this.cell.figure = thisFigure;
            target.figure = targetFigure;
            return true;
        }
        this.cell.figure = thisFigure;
        target.figure = targetFigure;

        return false;
    }
}
