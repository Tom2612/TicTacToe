const Player = (name, token) => {
    const getName = () => name;
    const getToken = () => token;
    return { getName, getToken };
};

const gameBoard = (() => {
    let board = ["X","X","X","X","X","X","X","X","X"];
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

    const setSquare = (index, token) => {
        if (index > board.length) return;
        board[index] = token;
    };

    const getField = (index) => {
        if (index > board.length) return;
        return board[index];
    };

   const updateBoard = (playerToken) => {
       for(let box of boxList) {
            box.addEventListener('click', () => {
            board.splice(box.id-1, 1, gameControl.getCurrentSign());
            box.innerHTML = board[box.id-1];
            gameControl.roundCount();
           });
       };
   };

   return { board, createBoard, updateBoard };
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

    const getCurrentSign = () => {
        return roundNum % 2 === 1 ? playerO.getToken() : playerX.getToken();
    };

    const endGame = () => {}

    const roundCount = () => {
        if(roundNum < 9) {
            roundNum++;
        } else {
            console.log('Game Over')
        }
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
    return { playerX, playerO, getCurrentSign, roundCount }
})();