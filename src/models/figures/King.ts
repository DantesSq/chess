import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './figure';
import blackLogo from '../../assets/black-king.svg';
import whiteLogo from '../../assets/white-king.svg';
export class King extends Figure {
    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.logo = color == Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;

        if (Math.abs(target.x - this.cell.x) <= 1 && Math.abs(target.y - this.cell.y) <= 1) {
            return true;
        }
        return false;
    }
}
