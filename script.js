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

                let { id: ply1Choice} = [...ply1ChoiceList].find(choice => choice.checked);
                let { id: ply2Choice} = [...ply2ChoiceList].find(choice => choice.checked);

                if (!ply1Choice || !ply2Choice || ply1Choice === ply2Choice) { return alert('You must pick two oppossing teams.')};

                const pvpPlayer1 = game.PlayerCreator(ply1Choice); 
                const pvpPlayer2 = game.PlayerCreator(ply2Choice);
                startGame(pvpPlayer1, pvpPlayer2);
                
                break;

            case 'cpu': 
                const plyChoiceList = getPlayerChoiceList();
                let { id: plyChoice} = [...plyChoiceList].find(choice => choice.checked);

                if (!plyChoice) { return alert('You need to pick a team')}

                const cpuPlayer1 = game.PlayerCreator(plyChoice);
                const cpuPlayer2 = game.PlayerCreator(plyChoice === 'x' ? 'o' : 'x');
                startGame(cpuPlayer1, cpuPlayer2, _gameType);

                break;
        }
    };

    return {
        gameTypeSelect,
    }

})();

const render = (() => {
    const body = document.querySelector('body');
    const draw = () => {
        body.innerHTML = '';
        const mainContainer = document.createElement('div');
        const wHeight = 500;

        mainContainer.className = 'mainContainer';
        mainContainer.style = `width: ${wHeight}px; height: ${wHeight}px`
    
        const canvas = document.createElement('div');
        canvas.className = 'canvas';
    
        mainContainer.appendChild(canvas);
        
        
        
        for (let i = 0; i < 9; i++) {

            const square = document.createElement('div');
            square.className = 'square';

            if (game.getBoard(i) == 'x') {
                square.textContent = 'X';
            } else if (game.getBoard(i) == 'o') {
                square.textContent = 'O';
            }

            if (!game.gameProperties.gameOver) {
                square.addEventListener('click', (e) => {
                    const index = [...e.target.parentNode.children].indexOf(e.target);
                    game.makeMove(index);
                }); 
            }
            
            canvas.appendChild(square);

        }

        
        body.appendChild(mainContainer);
        
    
        const gameOverButtons = () => {
            body.insertAdjacentHTML('beforeend', htmlLines.gameOverButtons);

            const rematchBtn = document.querySelector('.rematchBtn');
            const startOverBtn = document.querySelector('.startOverBtn');

            rematchBtn.addEventListener('click', () => {
                game.reset();
                draw();
            });

            startOverBtn.addEventListener('click', () => {
                game.reset();
                intro.gameTypeSelect();
            });
        }


        if (game.gameProperties.gameOver) {

            gameOverButtons();

        } else if (!game.gameProperties.gameOver && game.gameProperties.gameType == 'pvp') {

            body.insertAdjacentHTML('beforeend', htmlLines.gameRunPvpButtons);

            const ply1Forfeit = document.querySelector('.ply1ForfeitBtn');
            const ply2Forfeit = document.querySelector('.ply2ForfeitBtn');

            ply1Forfeit.addEventListener('click', () => {
                game.gameProperties.winningPlayer = game.gameProperties.player2;
                game.gameProperties.gameOver = true;
                game.fillSquares();
            });

            ply2Forfeit.addEventListener('click', () => {
                game.gameProperties.winningPlayer = game.gameProperties.player1;
                game.gameProperties.gameOver = true;
                game.fillSquares();
            });

        } else if (!game.gameProperties.gameOver && game.gameProperties.gameType == 'cpu') {

            body.insertAdjacentHTML('beforeend', htmlLines.gameRunCpuButtons);

            const forfeit = document.querySelector('.forfeitBtn');

            forfeit.addEventListener('click', () => {
                game.gameProperties.winningPlayer = game.gameProperties.player2;
                game.gameProperties.gameOver = true;
                game.fillSquares();
            })

        };
      
    }

    return {
        draw
    }

})();

const game = (() => {
    const gameProperties = {
        board: [null, null, null, null, null, null, null, null, null],
        availMoves: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        player1: null,
        player2: null,
        playerMove: null,
        gameType: null,
        gameOver: false,
        winningPlayer: null
    }

    const winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    const gp = gameProperties;

    const PlayerCreator = team => {return {
        team, board: []
    }};

    const setupGame = (ply1, ply2, gameType) => {
        gp.player1 = ply1;
        gp.player2 = ply2;
        gp.playerMove = ply1;
        gp.gameType = gameType;
    }

    const reset = () => {
        gp.board = [null, null, null, null, null, null, null, null, null];
        gp.availMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        gp.player1.board = [];
        gp.player2.board = [];
        gp.playerMove = gp.player1;
        gp.gameOver = false;
        gp.winningPlayer = null;
    }

    const fillSquares = () => {
        for (let i = 0; i < gp.board.length; i++) {
            if (gp.board[i] == null) {
                gp.board[i] = gp.winningPlayer.team;
            }
        }
        render.draw();
    }

    const getBoard = (index) => {
        return gameProperties.board[index];
    }

    const makeMove = (index) => {

        if (gp.gameType == 'pvp' && gp.board[index] == null) {

            gp.board[index] = gp.playerMove.team;
            gp.playerMove.board.push(index);
            gp.playerMove = (gp.playerMove == gp.player1) ? gp.player2 : gp.player1;

            winCheck();
            
        } else if (gp.gameType == 'cpu' && gp.board[index] == null) {
            gp.board[index] = gp.player1.team;
            gp.player1.board.push(index);
            gp.availMoves = gp.availMoves.filter(function(e) { return e !== index} );
            
            winCheck();

            if (gp.gameOver != true) {

                const cpuIndex = gp.availMoves[Math.floor(Math.random() * gp.availMoves.length)];
    
                gp.board[cpuIndex] = gp.player2.team;
                gp.player2.board.push(cpuIndex);
                gp.availMoves = gp.availMoves.filter(function(e) { return e !== cpuIndex} );

                winCheck();
    
            }
            

        }

        
    }

    const winCheck = () => {

        const ply1Board = gp.player1.board;
        const ply2Board = gp.player2.board;
        
        for (let i = 0; i < winCombinations.length; i++) {


            const trueCheckPly1 = winCombinations[i].every(element => ply1Board.includes(element));
            const trueCheckPly2 = winCombinations[i].every(element => ply2Board.includes(element));


            if (trueCheckPly1) {

                gp.gameOver = true;
                gp.gameWinner = gp.player1;
                render.draw();

            } else if (trueCheckPly2) {
                
                gp.gameOver = true;
                gp.gameWinner = gp.player2;
                render.draw();

            } else if (!trueCheckPly1 && !trueCheckPly2 && gp.availMoves.length == 0) {
               
                gp.gameOver = true;
                gp.gameWinner = 'draw';
                render.draw();

            } else {
                render.draw();
            }


        }

    }

    return { gameProperties, PlayerCreator, setupGame, getBoard, makeMove, reset, fillSquares }
    
})();

window.game = game;
window.intro = intro;
window.render = render;




