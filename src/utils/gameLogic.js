export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const checkWin = (board) => {
    for (let i = 0; i < 15; i++) {
        if (board[i] !== i + 1) return false;
    }
    return true;
};
