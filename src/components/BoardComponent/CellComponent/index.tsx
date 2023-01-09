import { FC } from 'react';
import { Cell } from '../../../models/Cell';

interface CellProps {
    cell: Cell;
    selected: boolean;
    onClickCell: (cell: Cell) => void;
}

export const CellComponent: FC<CellProps> = ({ cell, selected, onClickCell }) => {
    return (
        <div
            onClick={() => {
                onClickCell(cell);
            }}
            className={`cell ${cell.color} ${selected ? 'selected' : ''} ${
                cell.available && cell.figure ? 'enemy' : ''
            }`}>
            {cell.available && !cell.figure && <div className={'available'}></div>}

            <img alt="" src={cell.figure?.logo || ''} />
        </div>
    );
};

export default CellComponent;
