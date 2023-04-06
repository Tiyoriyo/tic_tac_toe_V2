import { htmlLines } from "./htmlLines.js";


const intro = (() => {
    const body = document.querySelector('body');

    const gameTypeSelect = (() => {
        const draw = () => {
            body.innerHTML = htmlLines.gameSelection;
        
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    if (e.target.className == 'pvpBtn') {
                        body.innerHTML = '';
                        setNameRender('pvp');
                    } else if (e.target.className == 'cpuBtn') {
                        body.innerHTML = '';
                        setNameRender('cpu');
                    }
                });
            });
        }

        draw();
        return { draw };
    })();

     

    const setNameRender = (type) => {
        if (type == 'pvp') {
            body.innerHTML = htmlLines.pvpTeamSelection;
        } else if (type == 'cpu') {
            body.innerHTML = htmlLines.cpuTeamSelection;
        }

        document.querySelector('.backBtn').addEventListener('click', gameTypeSelect.draw);
        document.querySelector('.confirmBtn').addEventListener('click', () => { confirmGame(type) });
    }

    const confirmGame = (type) => {
        if (type === 'pvp') {
            const ply1ChoiceList = document.getElementsByName('ply1GameType');
            const ply2ChoiceList = document.getElementsByName('ply2GameType');
            let ply1Choice;
            let ply2Choice;
      
            for (let i = 0; i < ply1ChoiceList.length; i++) {
                if (ply1ChoiceList[i].checked) {
                    ply1Choice = ply1ChoiceList[i].id;
                }
      
                if (ply2ChoiceList[i].checked) {
                    ply2Choice = ply2ChoiceList[i].id;
                }
            }
      
            if (!ply1Choice || !ply2Choice || ply1Choice === ply2Choice) {
                alert('You must pick two oppossing teams.');
            } else {
                game.setupGame(game.PlayerCreator(ply1Choice), game.PlayerCreator(ply2Choice), type);
                render.draw();
            }
      
        } else if (type === 'cpu') {
            const plyChoiceList = document.getElementsByName('gameType');
            const plyChoice = [...plyChoiceList].find((element) => element.checked)?.id;
            
            if (!plyChoice) {
                alert('You need to pick a team');
            } else {
                game.setupGame(game.PlayerCreator(plyChoice), game.PlayerCreator(plyChoice === 'x' ? 'o' : 'x'), type);
                render.draw();
            }
        }
    };

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
        
        const __makeMoveSquare = (e) => {
            const index = [...e.target.parentNode.children].indexOf(e.target);
            game.makeMove(index);
        }
        
        for (let i = 0; i < 9; i++) {

            const square = document.createElement('div');
            square.className = 'square';

            if (game.getBoard(i) == 'x') {
                square.textContent = 'X';
            } else if (game.getBoard(i) == 'o') {
                square.textContent = 'O';
            }

            if (!game.gameProperties.gameOver) {
                square.addEventListener('click', __makeMoveSquare);
            }
            
            canvas.appendChild(square);

        }
        
        body.appendChild(mainContainer);
        

        if (game.gameProperties.gameOver) {
            body.innerHTML += htmlLines.gameOverButtons;

            const rematchBtn = document.querySelector('.rematchBtn');
            const startOverBtn = document.querySelector('startOverButton');

            rematchBtn.addEventListener('click', game.restartGame);
        }
      
    }

    return {
        draw, removeEventListener
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

    const restartGame = () => {
        gp.board = [null, null, null, null, null, null, null, null, null];
        gp.availMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        gp.player1.board = [];
        gp.player2.board = [];
        gp.playerMove = gp.player1;
        gp.gameOver = false;
        gp.winningPlayer = null;
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

    return { gameProperties, PlayerCreator, setupGame, getBoard, makeMove, restartGame }
    
})();

window.game = game;
window.intro = intro;
window.render = render;




