import { htmlLines } from "./htmlLines.js";


const Intro = (() => {
    const Body = document.querySelector('body');

    const GameTypeSelect = (() => {
        const Render = () => {
            Body.innerHTML = htmlLines.GameSelection;
        
            const Buttons = document.querySelectorAll('button');
            Buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    if (e.target.className == 'PvPBtn') {
                        Body.innerHTML = '';
                        SetNameRender('pvp');
                    } else if (e.target.className == 'CPUBtn') {
                        Body.innerHTML = '';
                        SetNameRender('cpu');
                    }
                });
            });
        }

        Render();
        return { Render };
    })();

     

    const SetNameRender = (type) => {
        if (type == 'pvp') {
            Body.innerHTML = htmlLines.PVPTeamSelection;
        } else if (type == 'cpu') {
            Body.innerHTML = htmlLines.CPUTeamSelection;
        }

        document.querySelector('.BackBtn').addEventListener('click', GameTypeSelect.Render);
        document.querySelector('.ConfirmBtn').addEventListener('click', () => { confirmGame(type) });
    }

    const confirmGame = (type) => {
        if (type === 'pvp') {
            const ply1ChoiceList = document.getElementsByName('Ply1GameType');
            const ply2ChoiceList = document.getElementsByName('Ply2GameType');
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
                Game.player1 = Game.PlayerCreator(ply1Choice);
                Game.player2 = Game.PlayerCreator(ply2Choice);
                Game.gameType = 'pvp';
                Body.innerHTML = '';
                Render.render();
            }
      
        } else if (type === 'cpu') {
            const plyChoiceList = document.getElementsByName('GameType');
            const plyChoice = [...plyChoiceList].find((element) => element.checked)?.id;
            
            if (!plyChoice) {
                alert('You need to pick a team');
            } else {
                Game.player1 = Game.PlayerCreator(plyChoice);
                Game.player2 = Game.PlayerCreator(plyChoice === 'x' ? 'y' : 'x');
                Game.gameType = 'cpu';
                Body.innerHTML = '';
                Render.render();
            }
        }
    };

})();

const Render = (() => {
    const render = () => {
        const Body = document.querySelector('body');
        
        const MainContainer = document.createElement('div');
        const Width = 500;
        MainContainer.className = 'MainContainer';
        MainContainer.style = `width: ${Width}px; height: ${Width}px`
    
        const Canvas = document.createElement('div');
        Canvas.className = 'Canvas';
    
        MainContainer.appendChild(Canvas);
        
        for (let i = 0; i < 9; i++) {
            const Square = document.createElement('div');
            Square.className = 'Square';

            if (Game.Board[i] == 'x') {
                Square.textContent = 'X';
            } else if (Game.Board[i] == 'o') {
                Square.textContent = 'O';
            }

            Canvas.appendChild(Square);
        }
       
        Body.appendChild(MainContainer);
    }

    return {
        render
    }
})();

const Game = (() => {
    const Board = [null, null, null,
                    null, null, null,
                    null, null, null
    ];

    let gameType = null;
    let player1;
    let player2;

    const PlayerCreator = team => {return {team}};

    const setGameType = type => {gameType = type} 

    return { Board, PlayerCreator, setGameType, player1, player2, gameType }
})();




