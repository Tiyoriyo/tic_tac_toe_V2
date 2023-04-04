const Intro = (() => {
    const Body = document.querySelector('body');

    const GameTypeSelect = () => {
        Body.innerHTML = `
            <div class = 'GameTitle'>Tic Tac Toe</div>
            <div class = 'ButtonSet'>
                <button class = 'PvPBtn'>Player</button>
                <button class = 'CPUBtn'>Computer</button>
            </div>
        `
    
        const Buttons = document.querySelectorAll('button');
        Buttons.forEach(function(x) {
            x.addEventListener('click', (e) => {
                if (e.target.className == 'PvPBtn') {
                    Body.innerHTML = '';
                    SetNameRender('PvP');
                } else if (e.target.className == 'CPUBtn') {
                    Body.innerHTML = '';
                    SetNameRender('CPU');
                }
            });
        });
    };

    GameTypeSelect();    

    const SetNameRender = (type) => {
        if (type == 'PvP') {
            Body.innerHTML = `
            <div class = 'GameTitle'>Tic Tac Toe</div>
            <div class = 'InputFieldContainer'>
                <div class ='InputField'>
                    <div class ='InputTitle'>Player 1</div>
                    <div class = 'TeamFieldContainer'>
                        <div class ='TeamField'>
                            <div class = 'TeamSign'>X</div>
                            <input type = 'radio' id = 'x' name = 'Ply1GameType'></radio>
                        </div>
                        <div class ='TeamField'>
                            <div class ='TeamSign'>Y</div>
                            <input type = 'radio' id = 'y' name = 'Ply1GameType'></radio>
                        </div>
                    </div>
                </div>
                <div class ='InputField'>
                    <div class ='InputTitle'>Player 2</div>
                    <div class = 'TeamFieldContainer'>
                        <div class ='TeamField'>
                            <div class = 'TeamSign'>X</div>
                            <input type = 'radio' id = 'x' name = 'Ply2GameType'></radio>
                        </div>
                        <div class ='TeamField'>
                            <div class ='TeamSign'>Y</div>
                            <input type = 'radio' id = 'y' name = 'Ply2GameType'></radio>
                        </div>
                    </div>
                </div>
            </div>
            <div class = 'ButtonSet'>
                <button class = 'BackBtn'>Back</button>
                <button class = 'ConfirmBtn'>Confirm</button>
            </div>
            `
        } else if (type == 'CPU') {
            Body.innerHTML = `
            <div class = 'GameTitle'>Tic Tac Toe</div>
            <div class = 'TeamFieldContainer'>
                <div class ='TeamField'>
                    <div class = 'TeamSign'>X</div>
                    <input type = 'radio' id = 'x' name = 'GameType'></radio>
                </div>
                <div class ='TeamField'>
                    <div class ='TeamSign'>Y</div>
                    <input type = 'radio' id = 'y' name = 'GameType'></radio>
                </div>
            </div>
            <div class = 'ButtonSet'>
                <button class = 'BackBtn'>Back</button>
                <button class = 'ConfirmBtn'>Confirm</button>
            </div>
            `
        }

        document.querySelector('.BackBtn').addEventListener('click', GameTypeSelect);
        document.querySelector('.ConfirmBtn').addEventListener('click', () => { ConfirmGame(type) });
    }

    const ConfirmGame = (type) => {
        if (type == 'PvP') {

            const Ply1ChoiceList = document.getElementsByName('Ply1GameType');
            const Ply2ChoiceList = document.getElementsByName('Ply2GameType');

            let Ply1Choice;
            let Ply2Choice; 

            for (let i = 0; i < Ply1ChoiceList.length; i++) {
                if (Ply1ChoiceList[i].checked) {
                    Ply1Choice = Ply1ChoiceList[i].id;
                }

                if (Ply2ChoiceList[i].checked) {
                    Ply2Choice = Ply2ChoiceList[i].id;
                }
            }

            if ((Ply1Choice == Ply2Choice) || Ply1Choice == undefined || Ply2Choice == undefined) {
                alert('You need to pick two opposing teams');
            } else {
                Game.player1 = Game.PlayerCreator(Ply1Choice);
                Game.player2 = Game.PlayerCreator(Ply2Choice);
                Game.gameType = 'pvp';

                Body.innerHTML = '';

                Render._render();
            }

            


        } else if (type == 'CPU') {

            const PlyChoiceList = document.getElementsByName('GameType');
            
            let PlyChoice;

            for (let i = 0; i < PlyChoiceList.length; i++) {
                if (PlyChoiceList[i].checked) {
                    PlyChoice = PlyChoiceList[i].id;
                }
            }

            if (PlyChoice == undefined) {
                alert("You need to pick a team");
            } else {
                Game.player1 = Game.PlayerCreator(PlyChoice);
                if (PlyChoice == 'x') {
                    Game.player2 = Game.PlayerCreator('y');
                } else {
                    Game.player2 = Game.PlayerCreator('x');
                }
                Game.gameType('cpu');

                Body.innerHTML = '';

                Render._render();
            }

        }
    }


})();

const Render = (() => {
    const _render = () => {
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
        _render
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




