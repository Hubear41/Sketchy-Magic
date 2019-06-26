import Game from './game';
import { TUTORIAL, STAGE } from './levels/levels';

document.addEventListener('DOMContentLoaded', () => {
    const paperCanvas = document.getElementById('paperCanvas');
    const mainCanvas = document.getElementById('mainCanvas');
    const ctx = mainCanvas.getContext('2d');

    paper.setup(paperCanvas);
    const mouseTool = new Tool();

    const playPopup = document.getElementById('start');
    const startBtn = document.getElementById('start-btn');
    const retryBtn = document.getElementById('retry-btn');
    const restartBtn = document.getElementById('restart-btn');
    const practiceBtn = document.getElementById('practice-btn');
    const lineBtn = document.getElementById('line-btn');
    const triangleBtn = document.getElementById('triangle-btn');
    const gameEndScreen = document.getElementById('game-over');
    const practiceScreen = document.getElementById('practice');
    const continueBtn = document.getElementById('continue-btn');
    const instructionScreen = document.getElementById('instructions')
    const practiceBackBtn = document.getElementById('practice-back-btn');
    const instructionBackBtn = document.getElementById('instruction-back-btn');

    // prevents right-click from happening over canvas
    paperCanvas.oncontextmenu = e => e.preventDefault();
    mainCanvas.oncontextmenu = e => e.preventDefault();
    playPopup.oncontextmenu = e => e.preventDefault();
    gameEndScreen.oncontextmenu = e => e.preventDefault();
    practiceScreen.oncontextmenu = e => e.preventDefault();
    instructionScreen.oncontextmenu = e => e.preventDefault();
    startBtn.oncontextmenu = e => e.preventDefault();
    restartBtn.oncontextmenu = e => e.preventDefault();
    retryBtn.oncontextmenu = e => e.preventDefault();
    practiceBtn.oncontextmenu = e => e.preventDefault();
    instructionBackBtn.oncontextmenu = e => e.preventDefault();
    practiceBackBtn.oncontextmenu = e => e.preventDefault();
    continueBtn.oncontextmenu = e => e.preventDefault();
    lineBtn.oncontextmenu = e => e.preventDefault();
    triangleBtn.oncontextmenu = e => e.preventDefault();

    // loads start screen image
    let game = new Game(mainCanvas, mouseTool);
    let startAnimation;
    const startImage = new Image();
    startImage.src = 'assets/Backgrounds/field_with_trees.jpg';

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
        instructionScreen.className = "visible no-select";

        continueBtn.addEventListener('click', e => {
            instructionScreen.className = 'hidden';
            clearInterval(startAnimation);
            clearInterval(game.gameInterval);

            game.clear();
            game.reset();
            game.startLevels();
        });

        instructionBackBtn.addEventListener('click', e => {
            instructionScreen.className = 'hidden';
            playPopup.className = 'visible no-select';
            console.log('hi');
        });
    });

    retryBtn.addEventListener('click', e => {
        gameEndScreen.className = 'hidden';

        if ( game.levelType === TUTORIAL ) {
            game.reset();
            game.start();
        } else {
            game.reset();
            game.startLevels();
        }
    });

    restartBtn.addEventListener('click', e => {
        gameEndScreen.className = 'hidden';
        playPopup.className = 'visible no-select';

        clearInterval(game.gameInterval);
        game.reset();
        game.clear();

        // restarts the background animation
        startAnimation = setInterval(() => {
            let dx = 1;
            let position = 0;   

            ctx.drawImage(startImage, position, 200, 1280, 800, 0, 0, 1280, 600);

            if (position === 640 && dx > 0) {
                dx = -1;
            } else if (position === 0 && dx < 0) {
                dx = 1;
            } else if (position < 50 && dx < 0) {
                dx = -0.5;
            } else if (position > 590 && dx > 0) {
                dx = 0.5;
            }

            position += dx;
        }, 50);
    });

    practiceBtn.addEventListener('click', e => {
        playPopup.className = 'hidden';
        practiceScreen.className = 'visible no-select';

        practiceBackBtn.addEventListener('click', () => {
            practiceScreen.className = 'hidden';
            playPopup.className = 'visible no-select';
        });
    });

    lineBtn.addEventListener('click', e => {
        practiceScreen.className = 'hidden';
        instructionScreen.className = 'visible no-select';
        
        continueBtn.addEventListener('click', e => {
            instructionScreen.className = 'hidden';
            clearInterval(startAnimation);
            clearInterval(game.gameInterval);

            ctx.clearRect(0,0, 1280, 600);
            game.reset();
            game.startPractice(0);
        });

        instructionBackBtn.addEventListener('click', e => {
            instructionScreen.className = 'hidden';
            practiceScreen.className = 'visible no-select';
        });
    });

    triangleBtn.addEventListener('click', e => {
        practiceScreen.className = 'hidden';
        instructionScreen.className = 'visible no-select';
        
        continueBtn.addEventListener('click', e => {
            instructionScreen.className = 'hidden';
            clearInterval(startAnimation);
            clearInterval(game.gameInterval);

            ctx.clearRect(0, 0, 1280, 600);
            game.reset();
            game.startPractice(1);
        });

        instructionBackBtn.addEventListener('click', e => {
            instructionScreen.className = 'hidden';
            practiceScreen.className = 'visible no-select';
        });
    });
});