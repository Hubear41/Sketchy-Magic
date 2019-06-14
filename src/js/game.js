import shapeFinder from './shape_finder';
import Chest from './Chest';
import Player from './Player';
import Enemy from './Enemies';
import * as VectorUtil from './vector_util';

class Game {
    constructor(canvas, paper) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.paper = paper; 
        this.chest = new Chest(canvas);
        this.player = new Player(canvas);
        this.enemyCount = 21;
        this.activeSpells = [];
        this.enemies = [];
        this.createEnemies();

        this.mouseTool = new Tool();
        this.spellFinder = new shapeFinder(this.mouseTool, mainCanvas);

        this.draw = this.draw.bind(this);
        this.drawBg = this.drawBg.bind(this);
        this.drawEnemies = this.drawEnemies.bind(this);
        this.clear = this.clear.bind(this);

        document.addEventListener('mouseup', () => {
            let spell = this.spellFinder.currentSpell;  // returns a spell object

            this.activeSpells.push(spell);
        });
    }

    start() {
        setInterval(this.draw, 20);
        // setInterval(this.drawEnemies, 1000);
    }

    clear() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    createEnemies() {
        for (let i = 0; i < this.enemyCount; i++) {
            const zone = Math.floor((Math.random() * 5)) + 1;
            const speed = Math.floor((Math.random() * 300) + 200);
            let x, y;
            let enemy;
            // this.enemies.push(new Enemy(100, 100, this.ch))
            switch (zone) {
                case 1:
                    x = Math.floor(Math.random() * (-100));
                    y = Math.floor(Math.random() * (350)) + 350;
                    enemy = new Enemy(x, y, this.chest, this.canvas, speed, this.player);
                    this.enemies.push(enemy);
                    break;
                case 2:
                    x = Math.floor(Math.random() * (-100));
                    y = Math.floor(Math.random() * (350));
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
                    y = Math.floor(Math.random() * (350));
                    enemy = new Enemy(x, y, this.chest, this.canvas, speed, this.player);
                    this.enemies.push(enemy);
                    break;
                case 6:
                    x = Math.floor(Math.random() * (100) + 900);
                    y = Math.floor(Math.random() * (350)) + 350;
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

    drawPedestal() {
        const height = 80;
        const width = 120;

        this.ctx.beginPath();
        this.ctx.fillStyle = "darkgrey";
        this.ctx.rect(
            ((this.canvas.width - width) / 2),
            ((this.canvas.height - height) / 2),
            width,
            height
        );
        this.ctx.fill();
        this.ctx.closePath();
        
        this.ctx.beginPath();
        this.ctx.fillStyle = "grey";
        this.ctx.rect(
            ((this.canvas.width - width + 5) / 2),
            ((this.canvas.height - height + 5) / 2),
            width - 5,
            height - 5
        );
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.fillStyle = "darkgrey";
        this.ctx.rect(
            ((this.canvas.width - width + 10) / 2),
            ((this.canvas.height - height + 10) / 2),
            width - 10,
            height - 10,
        );
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.fillStyle = "grey";
        this.ctx.rect(
            ((this.canvas.width - width + 15) / 2),
            ((this.canvas.height - height + 15) / 2),
            width - 15,
            height - 15,
        );
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.fillStyle = "darkgrey";
        this.ctx.rect(
            ((this.canvas.width - width + 20) / 2),
            ((this.canvas.height - height + 20) / 2),
            width - 20,
            height - 20,
        );
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.fillStyle = "grey";
        this.ctx.rect(
            ((this.canvas.width - width + 25) / 2),
            ((this.canvas.height - height + 25) / 2),
            width - 25,
            height - 25,
        );
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.closePath();
    }

    drawSpells() {
        let spellsToRemove = [];

        for (let idx = 0; idx < this.activeSpells.length; idx++) {
            const spell = this.activeSpells[idx];

            spell.draw(this.ctx);
            if ( spell.life <= 0 ) {
                spellsToRemove.push(idx);
            }
        }

        spellsToRemove.forEach( idx => {
            this.activeSpells.splice(idx, 1);
        });
    }

    drawEnemies() {
        for (let idx = 0; idx < this.enemies.length; idx++) {
            const enemy = this.enemies[idx];
            enemy.draw();
        }
    }

    // enemyCollisionDetection(enemyPiece, nextPosition) {
    //     const { position, dx, dy } = enemyPiece;

    //     let collision = false; 
    //     this.enemies.forEach( otherEnemy => {
    //         if ( otherEnemy === enemyPiece ) {
    //             continue;
    //         }

    //         const otherEnemyNextPos = {
    //             x: otherEnemy.position.x + otherEnemy.dx,
    //             y: otherEnemy.position.y + otherEnemy.dy,
    //         }

    //         const betweenEnemyVector = VectorUtil.createVector(nextPosition, otherEnemyNextPos);

            
    //     });
        
    // }

    // playerCollisionDetection() {

    // }

    draw() {
        this.clear();
        this.drawBg();
        this.chest.draw();
        this.drawSpells();
        this.drawEnemies();
        this.player.draw();
    }
}

export default Game;