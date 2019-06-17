import shapeFinder from './shape_finder';
import Chest from './Chest';
import Player from './Player';
import Enemy from './Enemies';
import * as VectorUtil from './vector_util';

const DONE = 'DONE';

class Game {
    constructor(canvas, mouseTool) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.mouseTool = mouseTool; 
        this.chest = new Chest(canvas);
        this.player = new Player(canvas);
        this.enemyCount = 121;
        this.activeSpells = [];
        this.enemies = [];
        this.checkForGameover = false;
        this.createEnemies();

        this.draw = this.draw.bind(this);
        this.drawBg = this.drawBg.bind(this);
        this.drawEnemies = this.drawEnemies.bind(this);
        this.clear = this.clear.bind(this);
    }

    start() {
        this.setupSpellFinder();
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
            let spell = this.spellFinder.currentSpell;  // returns a spell object
            
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
            // this.activeSpells.push(spell);
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

    createEnemies() {
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
                    x = Math.floor(Math.random() * (450));
                    y = Math.floor(Math.random() * (-100)) - 100;
                    enemy = new Enemy(x, y, this.chest, this.canvas, speed, this.player);
                    this.enemies.push(enemy);
                    break;
                case 4:
                    x = Math.floor(Math.random() * (450)) + 450;
                    y = Math.floor(Math.random() * (-100)) - 100;
                    enemy = new Enemy(x, y, this.chest, this.canvas, speed, this.player);
                    this.enemies.push(enemy);
                    break;
                case 5:
                    x = Math.floor(Math.random() * (100)) + 900;
                    y = Math.floor(Math.random() * (200));
                    enemy = new Enemy(x, y, this.chest, this.canvas, speed, this.player);
                    this.enemies.push(enemy);
                    break;
                case 6:
                    x = Math.floor(Math.random() * (100) + 900);
                    y = Math.floor(Math.random() * (200)) + 200;
                    enemy = new Enemy(x, y, this.chest, this.canvas, speed, this.player);
                    this.enemies.push(enemy);
                    break;
                default:
                    break;
            }
        }
    }

    drawBg() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'green';
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
        this.ctx.closePath();

        this.drawPedestal();
    }

    // drawSpellCooldown() {
    //     const {width, height} = this.canvas;

    //     this.ctx.beginPath();
    //     this.ctx.rect( 10, height - 50, 20, 40);
    //     this.ctx.closePath();
    // }

    drawPedestal() {
        const height = 80;
        const width = 120;

        this.ctx.beginPath();
        this.ctx.fillStyle = "darkgrey";
        this.ctx.rect(
            ((this.canvas.width - width) / 2),
            (3 * (this.canvas.height - height) / 4),
            width,
            height
        );
        this.ctx.fill();
        this.ctx.closePath();
        
        this.ctx.beginPath();
        this.ctx.fillStyle = "grey";
        this.ctx.rect(
            ((this.canvas.width - width + 5) / 2),
            (3 * (this.canvas.height - height + 5) / 4),
            width - 5,
            height - 5
        );
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.fillStyle = "darkgrey";
        this.ctx.rect(
            ((this.canvas.width - width + 10) / 2),
            (3 * (this.canvas.height - height + 10) / 4),
            width - 10,
            height - 10,
        );
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.fillStyle = "grey";
        this.ctx.rect(
            ((this.canvas.width - width + 15) / 2),
            (3 * (this.canvas.height - height + 15) / 4),
            width - 15,
            height - 15,
        );
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.fillStyle = "darkgrey";
        this.ctx.rect(
            ((this.canvas.width - width + 20) / 2),
            (3 * (this.canvas.height - height + 20) / 4),
            width - 20,
            height - 20,
        );
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.fillStyle = "grey";
        this.ctx.rect(
            ((this.canvas.width - width + 25) / 2),
            (3 * (this.canvas.height - height + 25) / 4),
            width - 25,
            height - 25,
        );
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.closePath();
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

    enemySpellCollisionDetection() {
        // checks for other enemies
        // this.enemies.forEach( otherEnemy => {
        //     if ( otherEnemy === enemyPiece ) {
        //         return;
        //     }

        //     const otherEnemyNextPos = {
        //         x: otherEnemy.position.x + otherEnemy.dx,
        //         y: otherEnemy.position.y + otherEnemy.dy,
        //     };

        //     if ( nextPosition.x < otherEnemyNextPos.x + otherEnemy.length && 
        //          nextPosition.y < otherEnemyNextPos.y + otherEnemy.length && 
        //          nextPosition.x > otherEnemyNextPos.x &&
        //          nextPosition.y > otherEnemyNextPos.y ) 
        //     {
                
        //     }
        // });

        //check for magic spell area 
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

    // playerCollisionDetection() {

    // }

    draw() {
        this.clear();
        this.drawBg();
        this.chest.draw();
        this.enemySpellCollisionDetection();
        this.drawSpells();
        this.drawEnemies();
        this.player.draw();
        // this.drawSpellCooldown();

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