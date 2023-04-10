import { htmlLines } from "./htmlLines.js";


const intro = (() => {
    const body = document.querySelector('body');
    let _gameType;
    
    const gameTypeListeners = (e) => {
        switch (e.target.className) {
            case 'pvpBtn':
                setNameRender('pvp');
                break;
            case 'cpuBtn':
                setNameRender('cpu');
                break;
        }
    }

    const gameTypeSelect = () => {
        body.innerHTML = htmlLines.gameSelection;
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {button.addEventListener('click', gameTypeListeners)});
    };

    gameTypeSelect();

    const setNameRender = (type) => {
        body.innerHTML = '';
        switch (type) {
            case 'pvp':
                _gameType = 'pvp';
                body.innerHTML = htmlLines.pvpTeamSelection;
                break;
            case 'cpu':
                _gameType = 'cpu';
                body.innerHTML = htmlLines.cpuTeamSelection;
                break;
        }
        document.querySelector('.backBtn').addEventListener('click', gameTypeSelect);
        document.querySelector('.confirmBtn').addEventListener('click', confirmGame);
    }

    const confirmGame = () => {
        function getPlayerChoiceList(num) {
            switch (_gameType) {
                case 'pvp':
                    return document.getElementsByName(`ply${num}GameType`);
                case 'cpu':
                    return document.getElementsByName('gameType');
            }
        }

        function startGame(ply1, ply2) {
            game.setupGame(ply1, ply2, _gameType);
            render.draw();
        }

      

        switch (_gameType) {
            case 'pvp': 
                const ply1ChoiceList = getPlayerChoiceList(1);
                const ply2ChoiceList = getPlayerChoiceList(2);

                let ply1ChoiceDom = [...ply1ChoiceList].find((choice) => {return choice.checked ? choice.id : false});
                let ply2ChoiceDom = [...ply2ChoiceList].find((choice) => {return choice.checked ? choice.id : false});
            
                if (!ply1ChoiceDom || !ply2ChoiceDom || ply1ChoiceDom === ply2ChoiceDom) { return alert('You must pick two oppossing teams.')};

                const pvpPlayer1 = game.PlayerCreator(ply1ChoiceDom.id); 
                const pvpPlayer2 = game.PlayerCreator(ply2ChoiceDom.id);
                startGame(pvpPlayer1, pvpPlayer2);
                
                break;

            case 'cpu': 
                const plyChoiceList = getPlayerChoiceList();

                let plyChoiceDom = [...plyChoiceList].find((choice) => {return choice.checked ? choice.checked : false});

                if (!plyChoiceDom) { return alert('You need to pick a team')}

                const cpuPlayer1 = game.PlayerCreator(plyChoiceDom.id);
                const cpuPlayer2 = game.PlayerCreator(plyChoiceDom.id === 'x' ? 'o' : 'x');
                startGame(cpuPlayer1, cpuPlayer2, _gameType);

                break;
        }
    };

    return { gameTypeSelect}

})();

const render = (() => {
    const body = document.querySelector('body');

    const _createCanvasSquares = (canvas) => {
        for (let i = 0; i < game.gameProperties.board.length; i++) {
            const square = document.createElement('div');
            square.className = 'square';

            switch (game.getBoard(i)) {
                case 'x':
                    square.textContent = 'X';
                    break;
                case 'o':
                    square.textContent = 'O';
                    break;
            }   

            if (!game.gameProperties.gameOver) {
                square.addEventListener('click', (e) => {
                    const index = [...e.target.parentNode.children].indexOf(e.target);
                    game.makeMove(index);
                }); 
            }

            canvas.appendChild(square);   
        }
    }
    
    const _gameOverButtons = () => {
        body.insertAdjacentHTML('beforeend', htmlLines.gameOverButtons);

        const rematchBtn = document.querySelector('.rematchBtn');
        const startOverBtn = document.querySelector('.startOverBtn');

        rematchBtn.addEventListener('click', _gameOverButtonEventListener.rematch);
        startOverBtn.addEventListener('click', _gameOverButtonEventListener.startOver);
    }

    const _gameOverButtonEventListener = (() => {
        return {
            rematch: function() {
                game.reset();
                draw();
            },
            startOver: function() {
                game.reset();
                intro.gameTypeSelect();
            }
        }
    })();

    const _forfeitButtons = () => {

        switch (game.gameProperties.gameType) {
            case 'pvp':
                body.insertAdjacentHTML('beforeend', htmlLines.gameRunPvpButtons);

                const ply1Forfeit = document.querySelector('.ply1ForfeitBtn');
                const ply2Forfeit = document.querySelector('.ply2ForfeitBtn');
                ply1Forfeit.addEventListener('click', _forfeitEventListener);
                ply2Forfeit.addEventListener('click', _forfeitEventListener);
                break;
            case 'cpu': 
                body.insertAdjacentHTML('beforeend', htmlLines.gameRunCpuButtons);

                const forfeit = document.querySelector('.forfeitBtn');
                forfeit.addEventListener('click', _forfeitEventListener)
                break;
        }

    }

    function _forfeitEventListener(e) {
        switch (game.gameProperties.gameType) {
            case 'pvp':
                switch (e.target.className) {
                    case 'ply1ForfeitBtn':
                        game.gameProperties.winningPlayer = game.gameProperties.player2;
                        game.gameProperties.gameOver = true;
                        game.fillSquares();
                        draw();
                        break;
                    case 'ply2ForfeitBtn':
                        game.gameProperties.winningPlayer = game.gameProperties.player1;
                        game.gameProperties.gameOver = true;
                        game.fillSquares();
                        draw();
                        break;
                };
                break;
            case 'cpu':
                game.gameProperties.winningPlayer = game.gameProperties.player2;
                game.gameProperties.gameOver = true;
                game.fillSquares();
                draw();
                break;
        }    
    }

    const draw = () => {
        body.innerHTML = '';
        const mainContainer = document.createElement('div');
        const canvas = document.createElement('div');

        mainContainer.className = 'mainContainer';
        canvas.className = 'canvas';

        mainContainer.appendChild(canvas);
        body.appendChild(mainContainer);
        _createCanvasSquares(canvas);
        
        if (game.gameProperties.gameOver) {
            _gameOverButtons();
        } else {
            _forfeitButtons();
        }
    }

    return {
        draw
    }

})();

const game = (() => {
    const gameProperties = {
        board: [null, null, null, null, null, null, null, null, null],
        winCombinations: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
        player1: null,
        player2: null,
        playerMove: null,
        gameType: null,
        gameOver: false,
        winningPlayer: null,
    }

    const gp = gameProperties;

    const PlayerCreator = team => {return { team}};

    const setupGame = (ply1, ply2, gameType) => {
        gp.player1 = ply1; 
        gp.player2 = ply2;
        gp.playerMove = ply1; 
        gp.gameType = gameType;
    }

    const reset = () => {
        gp.board = [null, null, null, null, null, null, null, null, null];
        gp.availMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        gp.playerMove = gp.player1;
        gp.gameOver = false;
        gp.winningPlayer = null;
    }

    const fillSquares = () => {
        for (let i = 0; i < gp.board.length; i++) {
            if (!gp.board[i]) {
                gp.board[i] = gp.winningPlayer.team;
            }
        } 
    };

    const getBoard = (index) => {
        return gameProperties.board[index];
    }
    
    const makeMove = (index) => {

        function _fillBoardPositionCpu() {
            if (gp.gameOver) { return};

            function minimax(board, depth, maximizingPlayer) {
                let result = _winCheck(true, board);
                
                if (result !== false) {
                    switch (result) {  
                        case 'win':
                            return 10 - depth;
                        case 'loss':
                            return depth - 10;
                        case 'draw':
                            return 0;
                    }
                }
                
                if (maximizingPlayer) {
                    let bestScore = -Infinity;
                    for (let i = 0; i < board.length; i++) {
                        if (!board[i]) {
                            board[i] = gp.player2.team;
                            let score = minimax(board, depth + 1, false);
                            board[i] = null;
                            bestScore = Math.max(score, bestScore);    
                        }
                    }

                    return bestScore;

                } else if (!maximizingPlayer) {
                    let bestScore = Infinity;
                    for (let i = 0; i < board.length; i++) {
                        if (!board[i]) {
                            board[i] = gp.player1.team;
                            let score = minimax(board, depth + 1, true);
                            board[i] = null
                            bestScore = Math.min(score, bestScore);
                        }
                    }
                    
                    return bestScore;
                }
            }
        
            let tempBoard = gp.board;
            let bestScore = -Infinity;
            let bestMove = null;

            for (let i = 0; i < tempBoard.length; i++) {
                if (!tempBoard[i]) {
                    tempBoard[i] = gp.player2.team;
                    let score = minimax(tempBoard, 0, false);

                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = i;
                    } 

                    tempBoard[i] = null;
                }
            }

            gp.board[bestMove] = gp.player2.team;
            _winCheck(false);
        }

        function _fillBoardPosition(index) {
            switch (gp.gameType) {
                case 'pvp':
    
                    if (gp.board[index]) { return};
                    gp.board[index] = gp.playerMove.team; // Set board square to player team
                    gp.playerMove = (gp.playerMove == gp.player1) ? gp.player2 : gp.player1; // Switch moving player
                    _winCheck(false); // Check if Win
                    break;
    
                case 'cpu':
    
                    if (gp.board[index]) { return };
                    gp.board[index] = gp.player1.team; // Set board square to Player1 team
                    _winCheck(false); // Check if Win
                    _fillBoardPositionCpu(); // Cpu Move
                    break;
            }
        }
            
        _fillBoardPosition(index);
            
    }

    const _winCheck = (isMinimax, node) => {

        function getPlayerTeam(num) {
            switch (num) {
                case 1:
                    return gp.player1.team;
                case 2:
                    return gp.player2.team;
            }
        }

        function getActiveSquaresArray(player) {
            let obj = []
            
            switch (isMinimax) {
                case true:
                    for (let i = 0; i < node.length; i++) {
                        if (node[i] == player) {
                            obj.push(i);
                        }
                    };
                    break;
                case false:
                    for (let i = 0; i < gp.board.length; i++) {
                        if (gp.board[i] == player) {
                            obj.push(i);
                        }
                    };
                    break;
            }
            
       
            return obj;
        }

        function checkGameStatus(ply1, ply2) {

            let isPlayer1Win;
            let isPlayer2Win;

            for (let i = 0; i < gp.winCombinations.length; i++) {
                const isPlayer1WinCheck = gp.winCombinations[i].every(element => ply1.includes(element));
                const isPlayer2WinCheck = gp.winCombinations[i].every(element => ply2.includes(element));

                if (isPlayer1WinCheck) {
                    isPlayer1Win = true;

                } else if (isPlayer2WinCheck) {
                    isPlayer2Win = true;
                }

            }

            if (isPlayer1Win) {
                return 'player1';
            } else if (isPlayer2Win) {
                return 'player2'
            } else if (!isPlayer1Win && !isPlayer2Win && getSquaresLeft() == 0) {
                return 'draw'
            } else {
                return false;
            }
            
        }

        function setGameProperties (winner) {
            switch (winner) {
                case 'player1':
                    gp.gameOver = true;
                    gp.gameWinner = gp.player2;
                    break;
                case 'player2':
                    gp.gameOver = true;
                    gp.gameWinner = gp.player1;
                    break;
                case 'draw':
                    gp.gameOver = true;
                    gp.gameWinner = 'draw';
                    break;
            }   
        }

        function getSquaresLeft() {
            let count = 9;

            switch (isMinimax) {
                case true:
                    for (let i = 0; i < node.length; i++) {
                        if (node[i]) {
                            count--
                        }
                    }
                    break;
                case false:
                    for (let i = 0; i < gp.board.length; i++) {
                        if (gp.board[i]) {
                            count--;
                        }
                    }
            }


           
            return count;
        }

        const player1Board = getActiveSquaresArray(getPlayerTeam(1));
        const player2Board = getActiveSquaresArray(getPlayerTeam(2));

        

        const winner = checkGameStatus(player1Board, player2Board);

        switch (isMinimax) {
            case true:
                switch (winner) {
                    case 'player1':
                        return 'loss'
                
                    case 'player2': 
                        return 'win'
        
                    case 'draw':
                        return 'draw'
        
                    case false:
                        return false;
                }
            
            case false:
                switch (winner) {
                    case 'player1':
                        setGameProperties('player1');
                        render.draw();
                        break;
        
                    case 'player2': 
                        setGameProperties('player2');
                        render.draw();
                        break;
        
                    case 'draw':
                        setGameProperties('draw');
                        render.draw();
                        break;
        
                    case false:
                        render.draw();
                        break;
                }
        }
    }

    return { gameProperties, PlayerCreator, setupGame, getBoard, makeMove, reset, fillSquares }
    
})();

window.game = game;
window.intro = intro;
window.render = render;




