import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
    const paperCanvas = document.getElementById('paperCanvas');
    const mainCanvas = document.getElementById('mainCanvas');
    paper.setup(paperCanvas);
    const mouseTool = new Tool();


    const playPopup = document.getElementById('start');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const gameEndScreen = document.getElementById('game-over');

    let game = new Game(mainCanvas, mouseTool);
    game.drawBg();

    startBtn.addEventListener('click', e => {
        playPopup.className = "hidden";
        startBtn.className = 'hidden';

        game.start();
    });

    restartBtn.addEventListener('click', e => {
        gameEndScreen.className = 'hidden';

        game = new Game(mainCanvas, mouseTool);
        game.start();
    });
});

