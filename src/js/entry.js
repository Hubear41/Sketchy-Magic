import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
    const paperCanvas = document.getElementById('paperCanvas');
    const mainCanvas = document.getElementById('mainCanvas');
    paper.setup(paperCanvas);

    const playPopup = document.getElementById('start');
    const startBt = document.getElementById('start-btn');

    const game = new Game(mainCanvas, paperCanvas);
    game.drawBg();

    startBt.addEventListener('click', e => {
        playPopup.className = "hidden";
        startBt.className = 'hidden';

        game.start();
    });
});

