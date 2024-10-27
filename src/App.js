import React, { useState, useEffect } from 'react';
import Board from './components/board';
import { shuffleArray, checkWin } from './utils/gameLogic';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#9c27b0',
        },
    },
});

const App = () => {
    const [board, setBoard] = useState([...Array(15).keys()].map(i => i + 1).concat(16));  // Initial state
    const [moveCount, setMoveCount] = useState(0);
    const [time, setTime] = useState(0);
    const [timerId, setTimerId] = useState(null);
    const [winDialogOpen, setWinDialogOpen] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false); // Track if timer has started


    useEffect(() => {

        shuffleBoard();
    }, []);

    const shuffleBoard = () => {
        const shuffledBoard = shuffleArray([...board]);
        setBoard(shuffledBoard);
        setMoveCount(0);  
        setTime(0);       
        setTimerStarted(false); 
        clearInterval(timerId); 
    };

    const startTimer = () => {
        if (!timerStarted) {  
            const id = setInterval(() => setTime(time => time + 1), 1000);
            setTimerId(id);
            setTimerStarted(true);  
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const onTileClick = (index) => {
        startTimer();  
        const emptyIndex = board.indexOf(16); 
        if (canSwap(index, emptyIndex)) {
            const newBoard = [...board];
            [newBoard[index], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[index]];
            setBoard(newBoard);
            setMoveCount(moveCount + 1);
            if (checkWin(newBoard)) {
                clearInterval(timerId);
                setWinDialogOpen(true);  
            }
        }
    };

    const canSwap = (index, emptyIndex) => {
        const row = Math.floor(index / 4);
        const emptyRow = Math.floor(emptyIndex / 4);
        const col = index % 4;
        const emptyCol = emptyIndex % 4;

        return (
            (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
            (col === emptyCol && Math.abs(row - emptyRow) === 1)
        );
    };

    const handleNewGame = () => {
        setWinDialogOpen(false);  
        shuffleBoard();        
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    textAlign: 'center',
                    marginTop: 5,
                    padding: 3,
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    boxShadow: 3,
                    maxWidth: '600px',
                    margin: 'auto'
                }}
            >
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    Sliding Puzzle Game
                </Typography>
                <Board board={board} onTileClick={onTileClick} />
                <Box sx={{ marginTop: 3 }}>
                    <Typography variant="h6" sx={{ color: '#555' }}>
                        Moves: {moveCount}
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#555' }}>
                        Time: {formatTime(time)}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={shuffleBoard}
                        sx={{ marginTop: 2, fontWeight: 'bold' }}
                    >
                        New Game
                    </Button>
                </Box>
            </Box>

          
            <Dialog open={winDialogOpen} onClose={() => setWinDialogOpen(false)}>
    <DialogTitle>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
            Congratulations!
        </Typography>
    </DialogTitle>
    <DialogContent sx={{ textAlign: 'center', padding: '20px 40px' }}>
        <Typography variant="h6" gutterBottom>
            You won in <strong>{moveCount}</strong> moves and <strong>{formatTime(time)}</strong>!
        </Typography>
    </DialogContent>
    <DialogActions sx={{ justifyContent: 'center', paddingBottom: '20px' }}>
        <Button
            onClick={handleNewGame}
            variant="contained"
            color="primary"
            sx={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold' }}
        >
            Start New Game
        </Button>
    </DialogActions>
</Dialog>

        </ThemeProvider>
    );
};

export default App;
