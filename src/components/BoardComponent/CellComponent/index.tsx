import React, { FC } from 'react';
import { Cell } from '../../../models/Cell';
import { Colors } from '../../../models/Colors';

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
            className={`cell ${cell.color} ${selected ? 'selected' : ''}`}>
            {cell.available && !cell.figure && <div className={'available'}></div>}
            <img src={cell.figure?.logo || ''} />
        </div>
    );
};

export default CellComponent;
