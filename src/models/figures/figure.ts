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

        if (this.canMove(this.getKing(this.color === Colors.BLACK ? Colors.WHITE : Colors.BLACK))) {
            alert('ШАХ');
        }

        this.isFirstStep = false;
        return true;
    }

    getKing(color: Colors): Cell {
        for (let i = 0; i < this.cell.board.cells.length; i++) {
            const row = this.cell.board.cells[i];
            for (let j = 0; j < row.length; j++) {
                if (row[j].figure?.name === FigureNames.KING && color == row[j].figure?.color) {
                    const king = row[j];
                    return king;
                }
            }
        }
    }

    isKingAttacked() {
        if()
    }

    // isKingAttacked(target: Cell) {
    //     for (let i = 0; i < target.board.cells.length; i++) {
    //         const row = target.board.cells[i];
    //         for (let j = 0; j < row.length; j++) {
    //             const target = row[j];
    //             if (target.figure?.name === FigureNames.KING) {
    //                 return this.kingEnemy(target);
    //             }
    //         }
    //     }
    // }
    // kingEnemy(kingCell: Cell): boolean {
    //     for (let i = 0; i < kingCell.board.cells.length; i++) {
    //         const row = kingCell.board.cells[i];
    //         for (let j = 0; j < row.length; j++) {
    //             const enemyCell = row[j];
    //             if (enemyCell.figure?.canMove(kingCell)) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }
}
