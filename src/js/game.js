import shapeFinder from './shape_finder';
import Chest from './Chest';
import Player from './Player';
import Enemy from './Enemies';
import Background from './Background';
import { TUTORIAL, STAGE, getLevelList } from './levels/levels';
import * as VectorUtil from './vector_util';

const DONE = 'DONE';

class Game {
    constructor(canvas, mouseTool) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.mouseTool = mouseTool; 
        this.chest = new Chest(canvas);
        this.background = new Background(canvas);

        // player/spells attributes
        this.player = new Player(canvas);
        this.activeSpells = [];

        // level/wave attributes
        this.levelList = getLevelList();
        this.currentLevel = 0;
        this.currentWave = null;
        this.levelType = null;

        // enemy attributes
        this.enemyCount = 1000;
        this.enemies = [];
        this.createEnemies();
        
        // level/game end flags
        this.checkForGameover = false;
        this.levelOver = false;

        this.draw = this.draw.bind(this);
        this.drawEnemies = this.drawEnemies.bind(this);
        this.clear = this.clear.bind(this);
    }

    start() {
        this.setupSpellFinder();
        // this.updateLevelSettings(); // should be tutorial 1 wave 1 on initial load

        this.gameInterval = setInterval(this.draw, 20);

        setTimeout( () => {
            this.checkForGameover = true;
        }, 5000);
    }

    clear() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
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

        // debugger
        if (x + this.chest.chestWidth  < 0 || x > this.canvas.width || 
            y + this.chest.chestHeight < 0 || y > this.canvas.height ) {
            return true;
        } else {
            return false;
        }
    }

    win() {
        if ( this.enemies.length <= 0 || !this._enemiesInBounds ) {
            return true;
        } else {
            return false;
        }
    }

    isGameover() {
        if ( !this.win() && !this.lose() ) {
            return false;
        } 

        clearTimeout(this.gameInterval);
        const gameEndScreen = document.getElementById('game-over');
        const messageEl = document.getElementById('game-over-msg');

        gameEndScreen.className = 'visible';
        messageEl.innerHTML = this.lose() ? 'You Lose' : 'You Win';
    }

    updateLevelSettings() {
        // add logic for winning for there are no more levels
        const nextLevel = this.levelList[this.currentLevel];

        this.currentWave = nextLevel.firstWave;
        this.enemies = 0;
        this.levelType = nextLevel.type;
        this.createEnemies();
    }

    updateWave() {
        if (this.currentWave.waveCondition(this.enemyCount) === true) {
            const nextWave = this.currentWave.nextWave;

            if ( nextWave === null ) {
                this.currentLevel++;
                this.updateLevelSettings()
            } else {
                this.createEnemies();
            }

        }
    }

    createEnemies() {
        // const newEnemyCount = this.currentWave.enemyCount;

        for (let i = 0; i < this.enemyCount; i++) {
            const zone = Math.floor((Math.random() * 5)) + 1;
            const speed = Math.floor((Math.random() * 300) + 200);
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
        // debugger
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
        // this.createEnemies();

        if ( this.checkForGameover ) {
            this.isGameover();
        }
    }

    _enemiesInBounds() {
        this.enemies.forEach(enemy => {
            const { x, y } = enemy.position;
            debugger
            if (x >= 0 && x + enemy.length <= this.canvas.width &&
                y >= 0 && y + enemy.length <= this.canvas.height) {
                return true;
            }
        });

        return false
    }
}

export default Game;