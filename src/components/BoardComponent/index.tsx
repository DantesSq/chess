import React, { FC } from 'react';
import { Board } from '../../models/Board';
import { Cell } from '../../models/Cell';
import { Colors } from '../../models/Colors';
import CellComponent from './CellComponent';
import PlayerComponent from './PlayerComponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    restart: () => void;
}

const minutesArr = [1, 3, 10];

const BoardComponent: FC<BoardProps> = (props) => {
    const { board, setBoard, restart } = props;
    const [selectedCell, setSelectedCell] = React.useState<Cell | null>(null);

    const [whitePlayer, setWhitePlayer] = React.useState<boolean>(false);
    const [blackPlayer, setBlackPlayer] = React.useState<boolean>(false);

    const [resetTimer, setResetTimer] = React.useState<boolean>(false);

    const [showMinutes, setShowMinutes] = React.useState<boolean>(true);
    const [time, setTime] = React.useState<number>(0);

    const startGame = (min: number) => {
        setTime(min);
        setWhitePlayer(true);
        setBlackPlayer(false);
        setResetTimer(true);
        setShowMinutes(false);
    };

    const restartGame = () => {
        restart();
        setWhitePlayer(false);
        setBlackPlayer(false);
        setResetTimer(true);
        setShowMinutes(true);
    };

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

    const highLightCells = () => {
        if (selectedCell) {
            board.highLightCells(selectedCell);
        }
        updateBoard();
    };

    React.useEffect(() => {
        highLightCells();
    }, [selectedCell]);

    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    };

    return (
        <>
            {showMinutes && (
                <div className="minutes">
                    {minutesArr.map((el, id) => {
                        console.log(el);
                        return (
                            <div
                                key={id}
                                onClick={() => {
                                    startGame(el);
                                }}
                                className="btn">
                                {el}
                            </div>
                        );
                    })}
                </div>
            )}

            <button className="btn restart" onClick={restartGame}>
                restart
            </button>

            <div className="board">
                <PlayerComponent
                    color="Black"
                    turn={blackPlayer}
                    time={time}
                    resetTimer={resetTimer}
                    setResetTimer={setResetTimer}
                />
                <div className="cells">
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
                                                cell.x === selectedCell?.x &&
                                                cell.y === selectedCell?.y
                                            }
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                <PlayerComponent
                    color="White"
                    turn={whitePlayer}
                    time={time}
                    resetTimer={resetTimer}
                    setResetTimer={setResetTimer}
                />
            </div>
        </>
    );
};

export default BoardComponent;
