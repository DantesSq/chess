import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './figure';
import blackLogo from '../../assets/black-queen.svg';
import whiteLogo from '../../assets/white-queen.svg';
export class Queen extends Figure {
    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.QUEEN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;
        if (
            this.cell.isEmptyHotizontal(target) ||
            this.cell.isEmptyVertical(target) ||
            this.cell.isEmptyDiagonal(target)
        ) {
            return this.canMoveCheck(target);
        }
        return false;
    }
}
