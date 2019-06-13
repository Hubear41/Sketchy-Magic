import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
    let paperCanvas = document.getElementById('paperCanvas');
    let mainCanvas = document.getElementById('mainCanvas');
    paper.setup(paperCanvas);

    const game = new Game(mainCanvas, paperCanvas);
    game.start();
});

