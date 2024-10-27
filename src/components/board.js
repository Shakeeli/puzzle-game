import React from 'react';
import Grid from '@mui/material/Grid';
import Tile from './tile';

const Board = ({ board, onTileClick }) => {
    return (
        <Grid container spacing={2} justifyContent="center">
            {board.map((number, index) => (
                <Grid item key={index} xs={3}>
                    <Tile number={number} onClick={() => onTileClick(index)} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Board;
