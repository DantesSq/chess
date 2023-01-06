import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './figure';
import blackLogo from '../../assets/black-king.svg';
import whiteLogo from '../../assets/white-king.svg';
export class King extends Figure {
    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;
        if (Math.abs(target.x - this.cell.x) <= 1 && Math.abs(target.y - this.cell.y) <= 1) {
            if (this.isCheck(target)) {
                return false;
            }
            return true;
        }
        return false;
    }

    isCheck(target: Cell): boolean {
        for (let i = 0; i < target.board.cells.length; i++) {
            const row = target.board.cells[i];
            for (let j = 0; j < row.length; j++) {
                if (row[j].figure)
                    if (row[j].figure?.color !== this.color) {
                        const enemyCell = row[j];
                        if (enemyCell !== target) {
                            const thisFigure = this;
                            const targetFigure = target.figure;
                            this.cell.figure = null;
                            target.figure = thisFigure;
                            if (enemyCell.figure?.canMove(target)) {
                                this.cell.figure = thisFigure;
                                target.figure = targetFigure;
                                return true;
                            }
                            this.cell.figure = thisFigure;
                            target.figure = targetFigure;
                        }
                    }
            }
        }
        return false;
    }
}
