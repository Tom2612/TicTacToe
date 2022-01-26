const Player = (name, token) => {
    const getName = () => name;
    const getToken = () => token;
    return { getName, getToken };
};

const gameBoard = (() => {
    let board = ["","","","","","","","",""];
    const boardDisplay = document.querySelector('.boardDisplay');
    const boxList = boardDisplay.childNodes;

    const createBoard = () => {
       for(let i = 0; i < 9; i++) {
            const gameBox = document.createElement('div');
            gameBox.classList.add('gameBox');
            gameBox.setAttribute('id', i+1);
            boardDisplay.append(gameBox);
       };
    };

   const updateBoard = () => {
       for(let box of boxList) {
            box.addEventListener('click', () => {
                if(box.innerHTML === 'O' || box.innerHTML === 'X') {
                    return;
                };
            board.splice(box.id-1, 1, gameControl.getCurrentSign());
            box.innerHTML = board[box.id-1];
            gameControl.roundCount();
            gameControl.currentPlayerDisplay();
            gameControl.checkWins(board);
           });
       };
   };

   const reset = () => {
    board = ["","","","","","","","",""];
        for (let box of boxList) {
            box.innerHTML = '';
        };
   };

   return { createBoard, updateBoard, reset };
})();

const gameControl = (() => {
    let roundNum = 1;
    let gameOver = false;
    gameBoard.createBoard();
    gameBoard.updateBoard();
    const player1Name = document.querySelector('input').value;
    const player2Name = document.querySelector('input').value;
    let playerX = Player(player1Name, 'X');
    let playerO = Player(player2Name, 'O');

    const currentPlayerDisplay = () => {
        const sign = document.querySelector('.currentPlayerDisplay');
        if (!gameOver) {
            sign.textContent = `Player ${getCurrentSign()} to go`;
        } else if (gameOver) {
            sign.textContent = 'Game over!';
        };
    };

    const getCurrentSign = () => {
        return roundNum % 2 === 1 ? playerO.getToken() : playerX.getToken();
    };

    const roundCount = () => {
        if(roundNum < 9) {
            roundNum++;
        } else {
            endGame('draw');
            console.log('Game Over');
        };
    };

    const endGame = (winner) => {
        gameOver = true;
        const boxes = document.querySelectorAll('.gameBox');
        for (let box of boxes) {
            box.classList.add('disabled');
        };
        const sayResult = document.querySelector('.result');
        if (winner === 'X' || winner === 'O'){
            sayResult.textContent = `Player ${winner} is the champion!`;
        } else if (winner === 'draw') {
            sayResult.textContent = `It's a ${winner}!`;
        }
    };

    const checkWins = (board) => {
        winningArray.forEach(function(array) {
            let a = array[0] - 1, b = array[1] - 1, c = array [2] - 1;
            if(board[a] === 'X' && board[b] === 'X' && board[c] === 'X'){
                console.log('X is the winner');
                endGame('X');
            } else if (board[a] === 'O' && board[b] === 'O' && board[c] === 'O'){
                console.log('O is the winner');
                endGame('O');
            };
        });
    };

    const winningArray = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    const restart = () => {
        const restartBtn = document.querySelector('#restart');
        restartBtn.addEventListener('click', () => {
            roundNum = 1;
            gameOver = false;
            gameBoard.reset();
        });
    };
    
    return { currentPlayerDisplay, getCurrentSign, roundCount, checkWins, restart }
})();
