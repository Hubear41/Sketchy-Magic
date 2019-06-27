import shapeFinder from './shape_finder';
import Chest from './Chest';
import Player from './Player';
import Enemy from './Enemies';
import Background from './Background';
import { TUTORIAL, STAGE, getLevels, getPractice } from './levels/levels';
import * as VectorUtil from './vector_util';

const DONE = 'DONE';
const STARTING = 'STARTING';
const STARTED = 'STARTED';
const ENDING = 'ENDING';
const ENDED = 'ENDED';

class Game {
    constructor(canvas, mouseTool) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.mouseTool = mouseTool; 
        this.chest = new Chest(canvas);
        this.background = new Background(canvas);
        this.playing = false;
        this.paused = false;

        // player/spells attributes
        this.player = new Player(canvas);
        this.activeSpells = [];

        // level/wave attributes
        this.levelList = null;
        this.currentLevel = 0;
        this.currentWave = null;
        this.levelType = null;

        // enemy attributes
        this.enemyCount = 0;
        this.enemies = [];
        
        // level/game end flags
        this.checkForGameover = false;
        this.levelOver = false;

        // transition values 
        this.state = null;
        this.startFrame = 0;
        this.endFrame = 0;

        this.draw = this.draw.bind(this);
        this.drawEnemies = this.drawEnemies.bind(this);
        this.clear = this.clear.bind(this);
    }
    
    startPractice(levelNum) {
        this.tutorialLevelNum = levelNum;
        this.levelList = getPractice(levelNum);
        this.currentLevel = 0;
        this.start();   
    }

    startLevels() {
        this.levelList = getLevels();
        this.currentLevel = 0;
        this.start();
    }

    start() {
        this.playing = true;
        this.setupSpellFinder();
        this.updateLevelSettings(); // should be tutorial 1 wave 1 on initial load

        this.gameInterval = setInterval(this.draw, 20);
    }

    reset() {
        // this.levelList = null;
        this.activeSpells = [];
        this.enemies = [];
        this.enemyCount = 0;
        this.chest.reset();
        this.checkForGameover = false;
        this.currentWave = null;
        this.currentLevel = 0;
        this.levelOver = false;
        this.playing = false;
        this.paused = false;
        clearTimeout(this.gameOverTimeout);
    }

    clear() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    pause() {
        clearInterval(this.gameInterval);
        this.paused = true;
        this.checkForGameover = false;

        const gameEndScreen = document.getElementById('game-over');
        const messageEl = document.getElementById('game-over-msg');

        messageEl.innerHTML = 'Paused';
        gameEndScreen.className = 'visible';
    }

    continue() {
        const gameEndScreen = document.getElementById('game-over');
        gameEndScreen.className = 'hidden';

        this.paused = false;
        this.gameInterval = setInterval(this.draw, 20);
    }

    setupSpellFinder() {
        this.spellFinder = new shapeFinder(this.mouseTool, mainCanvas);

        document.addEventListener('mouseup', () => {
            let spell = this.spellFinder.currentSpell;  // returns a spell object if there was a recognized shape
            
            if ( spell ) {
                switch ( spell.shape ) {
                    case 'LINE':
                        if ( this.player.readyLine() ) {
                            this.activeSpells.push(spell);
                        }
                        break;
                    case 'TRIANGLE':
                        if ( this.player.readyTriangle() ) {
                            this.activeSpells.push(spell);
                        }
                        break;
                    default: 
                        break;
                }
            }
        });
    }

    lose() {
        const { x, y } = this.chest.position;

        if (x + this.chest.chestWidth  < 0 || x > this.canvas.width || 
            y + this.chest.chestHeight < 0 || y > this.canvas.height ) {
            return true;
        } else {
            return false;
        }
    }

    win() {
        const level = this.levelList[this.currentLevel];
        
        if ( this.levelList.length === this.currentLevel && (this.enemies.length <= 0 || this._enemiesOutBounds())) {
            return true;
        } else if ( this.currentLevel < this.levelList.length ) {
            if ( level.waveCondition( this.enemies.length, this.enemyCount ) && this.state === STARTED ) { //need condition for current wave
                this.updateWave();
            }
        }

        return false;
    }

    isGameover() {
        if ( !this.win() && !this.lose() ) {
            return false;
        }

        if ( this.state !== ENDED ){
            this.state = ENDED;

            setTimeout( () => {
                clearTimeout(this.gameInterval);
                this.playing = false;
                this.checkForGameover = false;
    
                const gameEndScreen = document.getElementById('game-over');
                const messageEl = document.getElementById('game-over-msg');
        
                gameEndScreen.className = 'visible';
                messageEl.innerHTML = this.lose() ? '<p class="game-header">You Lose</p>' : '<p class="game-header>You Win<p>';
            }, 1000);
        }
    }

    updateLevelSettings() {
        this.chest.reset();
        this.activeSpells = [];
        
        const newLevel = this.levelList[this.currentLevel];
        
        this.currentWave = newLevel ? newLevel.currWave : null;
        this.enemies = [];
        
        if ( this.currentWave !== null ) {
            this.enemyCount = this.currentWave.enemyCount;
            this.levelType = newLevel.type;
            
            this.state = STARTING;
            this.startFrame = 0;
            setTimeout( () => {
                this.state = STARTED
                this.createEnemies(this.currentWave.enemyCount);
            }, 2000);
        }

        clearTimeout(this.gameOverTimeout);
        this.gameOverTimeout = setTimeout(() => {
            this.checkForGameover = true;
        }, 5000);
    }

    updateWave() {
        const nextWave = this.currentWave.nextWave;
        
        if ( nextWave === null && (this.enemies.length <= 0 || this._enemiesOutBounds()) ) {
            this.currentLevel++;
            this.updateLevelSettings()
        } else if ( nextWave !== null) {
            this.currentWave = nextWave;
            this.enemyCount += this.currentWave.enemyCount;
            this.createEnemies(this.currentWave.enemyCount);
        }
    }

    createEnemies(numOfEnemies) {
        if ( this.currentWave.defaultPositions === null ) { // if there aren't any default positions
            for (let i = 0; i < numOfEnemies; i++) {
                const zone = Math.floor((Math.random() * 5)) + 1;
                const speed = Math.floor((Math.random() * 300) + 300);
                let x, y;
                let enemy;
    
                switch (zone) {
                    case 1:
                        x = Math.floor(Math.random() * (-100));
                        y = Math.floor(Math.random() * (200)) + 200;
                        enemy = new Enemy(x, y, this.chest, this.canvas, speed, this.player);
                        this.enemies.push(enemy);
                        break;
                    case 2:
                        x = Math.floor(Math.random() * (-100));
                        y = Math.floor(Math.random() * (200));
                        enemy = new Enemy(x, y, this.chest, this.canvas, speed, this.player);
                        this.enemies.push(enemy);
                        break;
                    case 3:
                        x = Math.floor(Math.random() * (this.canvas.width / 2));
                        y = Math.floor(Math.random() * (-100)) - 100;
                        enemy = new Enemy(x, y, this.chest, this.canvas, speed, this.player);
                        this.enemies.push(enemy);
                        break;
                    case 4:
                        x = Math.floor(Math.random() * (this.canvas.width / 2)) + this.canvas.width / 2;
                        y = Math.floor(Math.random() * (-100)) - 100;
                        enemy = new Enemy(x, y, this.chest, this.canvas, speed, this.player);
                        this.enemies.push(enemy);
                        break;
                    case 5:
                        x = Math.floor(Math.random() * (100)) + this.canvas.width;
                        y = Math.floor(Math.random() * (200));
                        enemy = new Enemy(x, y, this.chest, this.canvas, speed, this.player);
                        this.enemies.push(enemy);
                        break;
                    case 6:
                        x = Math.floor(Math.random() * (100) + this.canvas.width);
                        y = Math.floor(Math.random() * (200)) + 200;
                        enemy = new Enemy(x, y, this.chest, this.canvas, speed, this.player);
                        this.enemies.push(enemy);
                        break;
                    default:
                        break;
                }
            }
        } else { // if there are default positions
            this.currentWave.defaultPositions.forEach( ({ x, y }) => {
                const defaultEnemy = new Enemy(x, y, this.chest, this.canvas, 0, this.player);
                defaultEnemy.dx = 0;
                defaultEnemy.dy = 0;

                this.enemies.push(defaultEnemy);
            });

            this.currentWave.loaded = true;
        }
    }

    drawSpellCooldown() {
        const { width, height } = this.canvas;
        const { lineEnergy, lineMax, triangleEnergy, triangleMax } = this.player;

        // line spell
        const lineEnergyLevel = ( lineEnergy / lineMax ) * -50;
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(20, height - 30, 50, lineEnergyLevel);

        this.ctx.strokeStyle = lineEnergy === lineMax ? 'goldenrod' : 'darkgray';
        this.ctx.strokeStyle = ''
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.rect( 20, height - 80, 50, 50);
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(30, height - 40);
        this.ctx.lineTo(60, height - 70);
        this.ctx.lineTo(50, height - 70);
        this.ctx.lineTo(60, height - 70);
        this.ctx.lineTo(60, height - 60);
        this.ctx.stroke();
        this.ctx.closePath();

        // triangle spell 
        const triEnergyLevel = ( triangleEnergy / triangleMax ) * -50;
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(90, height - 30, 50, triEnergyLevel);

        this.ctx.strokeStyle = triangleEnergy === triangleMax ? 'goldenrod' : 'darkgray';
        this.ctx.strokeStyle = ''
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.rect(90, height - 80, 50, 50);
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(115, height - 70);
        this.ctx.lineTo(100, height - 40);
        this.ctx.lineTo(130, height - 40);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawTransitions() {
        switch(this.state) {
            case STARTING:
                this.drawStarting();
                break;
            case ENDING:
                this.drawEnding();
                break;
            default:
                break;
        }
    }

    drawStarting() {
        const level = this.levelList[this.currentLevel];
        let bgOpacity = 0.4;
        let fontOpacity = 1;

        if ( this.startFrame > 1600 ) {
            const multiplier = (2000 - this.startFrame) / 400; 
            bgOpacity = multiplier <= 0 ? 0 : bgOpacity * multiplier;
            fontOpacity *= multiplier <= 0 ? 0 : fontOpacity * multiplier;
        }

        this.ctx.fillStyle = `hsla(0, 0%, 0%, ${bgOpacity})`;
        this.ctx.fillRect(0,0,1280,600);
        
        this.ctx.strokeStyle = "hsla(360, 100%, 100%, 1)";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(0,300);
        this.ctx.lineTo(1280,300);
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.textAlign = 'center';
        this.ctx.font = 'normal bold 18pt "Press Start 2P"';
        
        this.ctx.fillStyle = `hsla(360, 100%, 100%, ${fontOpacity})`;
        this.ctx.fillText(level.name, 640, 250);

        this.ctx.font = 'normal normal 10pt "Press Start 2P"';
        this.ctx.fillStyle = `hsla(0, 0%, 10%, ${fontOpacity})`;
        this.ctx.fillText(level.description, 640, 350);

        this.startFrame += 20;
    }

    drawSpells() {
        let remainingSpells = [];

        for (let idx = 0; idx < this.activeSpells.length; idx++) {
            const spell = this.activeSpells[idx];

            spell.draw(this.ctx);
            if ( spell.state !== DONE ) {
                remainingSpells.push(spell);
            }
        }

        this.activeSpells = remainingSpells;
    }

    drawEnemies() {
        const remainingEnemies = [];
        for (let idx = 0; idx < this.enemies.length; idx++) {
            const enemy = this.enemies[idx];
            enemy.draw();

            if ( enemy.state !== 'DEAD') {
                remainingEnemies.push(enemy);
            }
        }

        this.enemies = remainingEnemies;
    }

    //check for magic spell area 
    enemySpellCollisionDetection() {
        this.activeSpells.forEach( spell => {
            this.enemies.forEach( enemyPiece => {
                if ( spell && spell.state !== 'DONE' ) {
                    switch ( spell.shape ) {
                        case 'LINE':
                            if ( spell.state === 'EXPLODING' ) {
                                const posToExplosion = VectorUtil.createVector(enemyPiece.position, spell.explosionPosition);
        
                                if ( posToExplosion.length < spell.explosionRadius ) {
                                    enemyPiece.drawDeath();
                                }
                            }
                            break; 
                        case 'TRIANGLE':
                            const enemyInSpell = VectorUtil.isPointInTriangle(enemyPiece.position, spell.points);
                            
                            if ( enemyInSpell ) {
                                if ( (spell.state === 'FREEZING' || spell.state === 'BEFORE_SHATTER') && enemyPiece.state !== 'FROZEN') {
                                    enemyPiece.animateShiver();
                                } else if ( spell.state === 'SHATTERING' && enemyPiece.state !== 'DYING' ) {
                                    enemyPiece.drawDeath();
                                }
                            }
                            break; 
                        default:
                            break;
                    }
                }
            });
        });
    }

    draw() {
        this.clear();
        this.background.drawBG();
        this.enemySpellCollisionDetection();
        this.drawSpells();
        this.drawEnemies();
        this.chest.draw();
        this.player.draw();
        this.background.drawFG();
        this.drawSpellCooldown();
        this.drawTransitions();
        // this.createEnemies();

        if ( this.checkForGameover ) {
            this.isGameover();
        }
    }

    _enemiesOutBounds() {
        this.enemies.forEach(enemy => {
            const { x, y } = enemy.position;
            if (x >= 0 && x + enemy.length <= this.canvas.width &&
                y >= 0 && y + enemy.length <= this.canvas.height) {
                return false;
            }
        });

        return true;
    }
}

export default Game;