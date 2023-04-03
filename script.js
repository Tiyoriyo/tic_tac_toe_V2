const Render = (() => {
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
        Canvas.appendChild(Square);
    }
   
    Body.appendChild(MainContainer);
})();