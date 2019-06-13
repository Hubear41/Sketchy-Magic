import shapeFinder from './shape_finder';

class Game {
    constructor(canvas, paper) {
        this.canvas = canvas;
        this.paper = paper; 

        this.mouseTool = new Tool();
        this.spellFinder = new shapeFinder(this.mouseTool, mainCanvas);
        this.draw = this.draw.bind(this);
        this.drawBg = this.drawBg.bind(this);

        document.addEventListener('mouseup', () => {
            this.spell = this.spellFinder.currentSpell;
        });
    }

    start() {
        setInterval(this.draw, 1000);
    }

    drawBg() {
        const ctx = this.canvas.getContext('2d');

        ctx.beginPath();
        ctx.rect(this.canvas.width / 2, this.canvas.height / 2, 20, 10);
        ctx.fillStyle = "#C1B8B6";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }

    drawSpells() {
        if (!this.spell) {
            return
        }

        // this.spell.draw();
        // this.spell.decreaseLife();
    }

    draw() {
        this.drawBg();
        this.drawSpells();
    }
}

export default Game;