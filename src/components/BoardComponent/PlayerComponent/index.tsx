import React, { FC } from 'react';
import bishopBlackLogo from '../../assets/black-bishop.svg';
import bishopWhiteLogo from '../../assets/white-bishop.svg';
import knightBlackLogo from '../../assets/black-knight.svg';
import knightWhiteLogo from '../../assets/white-knight.svg';
import pawnBlackLogo from '../../assets/black-pawn.svg';
import pawnWhiteLogo from '../../assets/white-pawn.svg';
import queenBlackLogo from '../../assets/black-queen.svg';
import queenWhiteLogo from '../../assets/white-queen.svg';
import rookBlackLogo from '../../assets/black-rook.svg';
import rookWhiteLogo from '../../assets/white-rook.svg';

interface PlayerComponentProps {
    color: string;
    turn: boolean;
    time: number;
    resetTimer: boolean;
    setResetTimer: any;
}

const PlayerComponent: FC<PlayerComponentProps> = ({
    color,
    turn,
    time,
    resetTimer,
    setResetTimer,
}) => {
    const [over, setOver] = React.useState(false);
    const [minutes, setMinutes] = React.useState<number>(time);
    const [seconds, setSeconds] = React.useState<number>(0);

    const timer = () => {
        if (over) return;
        if (minutes === 0 && seconds === 0) setOver(true);
        if (minutes !== 0 && seconds === 0) {
            setMinutes((prev: number) => prev - 1);
            setSeconds(59);
        }
        if (seconds !== 0) {
            setSeconds((prev) => prev - 1);
        }
    };

    React.useEffect(() => {
        if (resetTimer) {
            setMinutes(time);
            setSeconds(0);
            setResetTimer(false);
        }
        if (turn) {
            const intervalId = setInterval(() => timer(), 1000);
            return () => clearInterval(intervalId);
        }
    }, [minutes, seconds, turn, resetTimer]);

    return (
        <div className="player">
            <h1>{color} Player</h1>
            <div className="timer">
                {`${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`}
            </div>
        </div>
    );
};

export default PlayerComponent;
