import React from 'react';
import Button from '@mui/material/Button';

const Tile = ({ number, onClick }) => {
    return (
        <Button
            variant="contained"
            color={number === 16 ? 'default' : 'primary'}
            onClick={onClick}
            sx={{ width: '100px', height: '100px', fontSize: '20px' }}
            disabled={number === 16} 
        >
            {number !== 16 ? number : ''}
        </Button>
    );
};

export default Tile;
