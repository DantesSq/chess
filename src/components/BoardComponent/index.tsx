import React, { FC } from 'react';
import { Board } from '../../models/Board';
import { Cell } from '../../models/Cell';
import { Colors } from '../../models/Colors';
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = (props) => {
    const { board, setBoard } = props;
    const [selectedCell, setSelectedCell] = React.useState<Cell | null>(null);

    const [whitePlayer, setWhitePlayer] = React.useState<boolean>(true);
    const [blackPlayer, setBlackPlayer] = React.useState<boolean>(false);

    const onClickCell = (cell: Cell) => {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);

            setSelectedCell(null);
            highLightCells();
            setWhitePlayer((prev) => !prev);
            setBlackPlayer((prev) => !prev);
        } else if (
            (whitePlayer && cell.figure?.color === Colors.WHITE) ||
            (blackPlayer && cell.figure?.color === Colors.BLACK)
        ) {
            setSelectedCell(cell);
        }
    };

    React.useEffect(() => {
        highLightCells();
    }, [selectedCell]);

    const highLightCells = () => {
        if (selectedCell) {
            board.highLightCells(selectedCell);
        }
        updateBoard();
    };

    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    };

    return (
        <div className="board">
            {board.cells.map((row, index) => {
                return (
                    <div key={index}>
                        {row.map((cell) => {
                            return (
                                <CellComponent
                                    key={cell.id}
                                    cell={cell}
                                    onClickCell={onClickCell}
                                    selected={
                                        cell.x === selectedCell?.x && cell.y === selectedCell?.y
                                    }
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default BoardComponent;
