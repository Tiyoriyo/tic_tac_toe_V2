import { htmlLines } from "./htmlLines.js";


const intro = (() => {
    const body = document.querySelector('body');

    const gameTypeSelect = (() => {
        const render = () => {
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

        render();
        return { render };
    })();

     

    const setNameRender = (type) => {
        if (type == 'pvp') {
            body.innerHTML = htmlLines.pvpTeamSelection;
        } else if (type == 'cpu') {
            body.innerHTML = htmlLines.cpuTeamSelection;
        }

        document.querySelector('.backBtn').addEventListener('click', gameTypeSelect.render);
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
                game.player1 = game.PlayerCreator(ply1Choice);
                game.player2 = game.PlayerCreator(ply2Choice);
                game.gameType = 'pvp';
                body.innerHTML = '';
                render.render();
            }
      
        } else if (type === 'cpu') {
            const plyChoiceList = document.getElementsByName('gameType');
            const plyChoice = [...plyChoiceList].find((element) => element.checked)?.id;
            
            if (!plyChoice) {
                alert('You need to pick a team');
            } else {
                game.player1 = Game.PlayerCreator(plyChoice);
                game.player2 = Game.PlayerCreator(plyChoice === 'x' ? 'y' : 'x');
                game.gameType = 'cpu';
                body.innerHTML = '';
                render.render();
            }
        }
    };

})();

const render = (() => {
    const render = () => {
        const body = document.querySelector('body');
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

            if (game.board[i] == 'x') {
                square.textContent = 'X';
            } else if (game.board[i] == 'o') {
                square.textContent = 'O';
            }

            canvas.appendChild(square);
        }
       
        body.appendChild(mainContainer);
    }

    return {
        render
    }

})();

const game = (() => {
    const board = [null, null, null, null, null, null, null, null, null];
    let gameType = null;
    let player1 = null;
    let player2 = null;

    const PlayerCreator = team => {return {team}};

    const setGameType = type => {gameType = type} 

    return { board, PlayerCreator, setGameType, player1, player2, gameType }
    
})();




