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
    const Board = ['x', 'o', null,
                    null, null, null,
                    null, null, null
    ];

    return { Board }
})();



