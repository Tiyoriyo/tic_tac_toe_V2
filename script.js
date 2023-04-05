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
                game.player1 = Game.PlayerCreator(plyChoice);
                game.player2 = Game.PlayerCreator(plyChoice === 'x' ? 'o' : 'x');
                game.gameType = 'cpu';
                body.innerHTML = '';
                render.draw();
            }
        }
    };

})();

const render = (() => {
    const draw = () => {
        const body = document.querySelector('body');
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

            square.addEventListener('click', (e) => {
                const index = [...e.target.parentNode.children].indexOf(e.target);
                game.makeMove(index);
            })

            canvas.appendChild(square);
        }
       
        body.appendChild(mainContainer);
    }

    return {
        draw
    }

})();

const game = (() => {
    const gameProperties = {
        board: [null, null, null, null, null, null, null, null, null],
        player1: null,
        player2: null,
        playerMove: null,
        gameType: null
    }

    const winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    const gp = gameProperties;

    const PlayerCreator = team => {return {team}};

    const setupGame = (ply1, ply2, gameType) => {
        gp.player1 = ply1;
        gp.player2 = ply2;
        gp.playerMove = ply1;
        gp.gameType = gameType;
    }

    const getBoard = (index) => {
        return gameProperties.board[index];
    }

    const makeMove = (index) => {
        gp.board[index] = gp.playerMove.team;
        gp.playerMove = (gp.playerMove == gp.player1) ? gp.player2 : gp.player1;
        render.draw();
    }

    return { gameProperties, PlayerCreator, setupGame, getBoard, makeMove }
    
})();

window.game = game;
window.intro = intro;
window.render = render;




