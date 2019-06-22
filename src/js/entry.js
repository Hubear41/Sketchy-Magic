import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
    const paperCanvas = document.getElementById('paperCanvas');
    const mainCanvas = document.getElementById('mainCanvas');
    const ctx = mainCanvas.getContext('2d');
    paper.setup(paperCanvas);
    const mouseTool = new Tool();


    const playPopup = document.getElementById('start');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const gameEndScreen = document.getElementById('game-over');

    let game = new Game(mainCanvas, mouseTool);
    const startImage = new Image();
    startImage.src = 'assets/Backgrounds/field_with_trees.jpg';

    let startAnimation;

    startImage.onload = () => {
        let dx = 1;
        let position = 0;

        startAnimation = setInterval( () => {
            ctx.drawImage(startImage, position, 200, 1280, 800, 0, 0, 1280, 600);

            if ( position === 640 && dx > 0) {
                dx = -1;
            } else if ( position === 0 && dx < 0) {
                dx = 1;
            } else if ( position < 50 && dx < 0 ) {
                dx = -0.5;
            } else if ( position > 590 && dx > 0 ) {
                dx = 0.5;
            }

            position += dx;
        }, 50);
    }

    startBtn.addEventListener('click', e => {
        playPopup.className = "hidden";
        startBtn.className = 'hidden';
        clearInterval(startAnimation);

        game.clear();
        game.start();
    });

    restartBtn.addEventListener('click', e => {
        gameEndScreen.className = 'hidden';

        game = new Game(mainCanvas, mouseTool);
        game.start();
    });
});