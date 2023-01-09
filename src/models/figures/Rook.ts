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
            return this.canMoveCheck(target);
        }

        return false;
    }
}
