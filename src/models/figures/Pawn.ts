import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './figure';
import blackLogo from '../../assets/black-pawn.svg';
import whiteLogo from '../../assets/white-pawn.svg';
export class Pawn extends Figure {
    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.PAWN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

        if (Math.abs(target.y - this.cell.y) === 1 && target.x === this.cell.x + direction) {
            if (this.cell.isEnemy(target)) {
                return this.canMoveCheck(target);
            }
        }

        if (this.cell.y !== target.y) return false;

        if (this.cell.board.getCell(this.cell.x + direction, this.cell.y).isEmpty()) {
            if (this.isFirstStep) {
                if (this.cell.board.getCell(this.cell.x + 2 * direction, this.cell.y).isEmpty()) {
                    if (this.cell.x + 2 * direction === target.x) {
                        return this.canMoveCheck(target);
                    }
                }
            }
            if (this.cell.x + direction === target.x) {
                return this.canMoveCheck(target);
            }
        }
        return false;
    }
}
