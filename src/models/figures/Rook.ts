import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './figure';
import blackLogo from '../../assets/black-rook.svg';
import whiteLogo from '../../assets/white-rook.svg';
export class Rook extends Figure {
    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.ROOK;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;
        if (this.cell.isEmptyVertical(target) || this.cell.isEmptyHotizontal(target)) {
            const thisFigure = this.cell.figure;
            const targetFigure = target.figure;
            const king = this.getKing(this.color);
            console.log(king, 'king');
            target.figure = thisFigure;
            this.cell.figure = null;

            if (!king.figure?.isCheck(king)) {
                this.cell.figure = thisFigure;
                target.figure = targetFigure;
                return true;
            }
            this.cell.figure = thisFigure;
            target.figure = targetFigure;
        }

        return false;
    }
}
