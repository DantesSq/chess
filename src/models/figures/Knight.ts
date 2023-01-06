import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './figure';
import blackLogo from '../../assets/black-knight.svg';
import whiteLogo from '../../assets/white-knight.svg';
export class Knight extends Figure {
    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.logo = color == Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.KNIGHT;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;
        if (Math.abs(target.x - this.cell.x) === 2 && Math.abs(target.y - this.cell.y) === 1) {
            return true;
        }
        if (Math.abs(target.y - this.cell.y) === 2 && Math.abs(target.x - this.cell.x) === 1) {
            return true;
        }
        return false;
    }
}
