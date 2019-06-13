import shapeFinder from './shape_finder';
import Chest from './Chest';
import Player from './Player';

class Game {
    constructor(canvas, paper) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.paper = paper; 
        this.chest = new Chest(canvas);
        this.player = new Player(canvas);
        this.mouseTool = new Tool();
        this.spellFinder = new shapeFinder(this.mouseTool, mainCanvas);


        this.draw = this.draw.bind(this);
        this.drawBg = this.drawBg.bind(this);
        this.drawChest = this.drawChest.bind(this);
        this.clear = this.clear.bind(this);

        document.addEventListener('mouseup', () => {
            this.spell = this.spellFinder.currentSpell;
        });
    }

    start() {
        setInterval(this.draw, 20);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBg() {
        this.ctx.beginPath();
        this.ctx.rect(this.canvas.width / 2, this.canvas.height / 2, 20, 10);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawSpells() {
        if (!this.spell) {
            return
        }

        // this.spell.draw();
        // this.spell.decreaseLife();
    }

    drawChest() {
        const {position, chestHeight, chestWidth} = this.chest;

        this.ctx.fillStyle = 'goldenrod';
        this.ctx.strokeStyle = 'orange';
        this.ctx.lineWidth = 5;
        this.ctx.fillRect(position.x, position.y, chestWidth, chestHeight);
        this.ctx.strokeRect(position.x, position.y, chestWidth, chestHeight);
    }

    chestCollison() {
        
    }

    draw() {
        this.clear();
        this.drawBg();
        this.drawChest();
        this.drawSpells();
        this.player.draw();
    }
}

export default Game;