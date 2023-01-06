import { King } from './figures/King';
import { Colors } from './Colors';
import { Cell } from './Cell';
import { Rook } from './figures/Rook';
import { Queen } from './figures/Queen';
import { Knight } from './figures/Knight';
import { Pawn } from './figures/Pawn';
import { Bishop } from './figures/Bishop';
import { FigureNames } from './figures/figure';

export class Board {
    cells: Cell[][] = [];

    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null));
                } else row.push(new Cell(this, j, i, Colors.WHITE, null));
            }
            this.cells.push(row);
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x];
    }

    private addKings() {
        new King(this.getCell(0, 4), Colors.BLACK);
        new King(this.getCell(7, 3), Colors.WHITE);
    }
    private addQueens() {
        new Queen(this.getCell(0, 3), Colors.BLACK);
        new Queen(this.getCell(7, 4), Colors.WHITE);
    }

    private addRooks() {
        new Rook(this.getCell(0, 0), Colors.BLACK);
        new Rook(this.getCell(0, 7), Colors.BLACK);
        new Rook(this.getCell(7, 0), Colors.WHITE);
        new Rook(this.getCell(7, 7), Colors.WHITE);
    }
    private addKnights() {
        new Knight(this.getCell(0, 1), Colors.BLACK);
        new Knight(this.getCell(0, 6), Colors.BLACK);
        new Knight(this.getCell(7, 1), Colors.WHITE);
        new Knight(this.getCell(7, 6), Colors.WHITE);
    }

    private addBishops() {
        new Bishop(this.getCell(7, 2), Colors.WHITE);
        new Bishop(this.getCell(7, 5), Colors.WHITE);
        new Bishop(this.getCell(0, 2), Colors.BLACK);
        new Bishop(this.getCell(0, 5), Colors.BLACK);
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(this.getCell(1, i), Colors.BLACK);
            new Pawn(this.getCell(6, i), Colors.WHITE);
        }
    }

    public addFigures() {
        this.addKings();
        this.addQueens();
        this.addPawns();
        this.addRooks();
        this.addKnights();
        this.addBishops();
        this.addPawns();
    }

    public highLightCells(selectedCell: Cell) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        return newBoard;
    }
}
