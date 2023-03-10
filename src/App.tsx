import React from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import PlayerComponent from './components/BoardComponent/PlayerComponent';
import { Board } from './models/Board';

function App() {
    const [board, setBoard] = React.useState(new Board());

    React.useEffect(() => {
        restart();
    }, []);

    const restart = () => {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    };

    return (
        <div className="App">
            <BoardComponent board={board} setBoard={setBoard} restart={restart} />
        </div>
    );
}

export default App;
