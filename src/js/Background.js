class Background {
    constructor(canvas) {
        this.canvas = canvas;
        this.setupGrassSprites();
    }

    drawBG() {
        const ctx = this.canvas.getContext('2d');
        
        ctx.drawImage(this.grassImage, 0, 0);
        this.drawPedestal(ctx);
    }

    drawFG() {
        const ctx = this.canvas.getContext('2d');

        ctx.drawImage(this.treesImage, 0, 0);
    }

    setupGrassSprites() {
        this.grassImage = new Image();
        this.grassImage.src = 'assets/Grass/sketchy_magic_bg.png';
        this.treesImage = new Image();
        this.treesImage.src = 'assets/Grass/sketchy_magic_trees.png';
        this.stumpImage = new Image();
        this.stumpImage.src = 'assets/Grass/chopped96x96.gif';
    }

    drawPedestal(ctx) {
        const length = 150;
        const x = (this.canvas.width / 2) - (length / 2) + 2;
        const y = (3 * this.canvas.height / 4) - (3 * length / 4) + 14;

        ctx.drawImage(this.stumpImage, x, y, length, length)

        // const height = 80;
        // const width = 120;

        // ctx.beginPath();
        // ctx.fillStyle = "darkgrey";
        // ctx.rect(
        //     ((this.canvas.width - width) / 2),
        //     (3 * (this.canvas.height - height) / 4),
        //     width,
        //     height
        // );
        // ctx.fill();
        // ctx.closePath();

        // ctx.beginPath();
        // ctx.fillStyle = "grey";
        // ctx.rect(
        //     ((this.canvas.width - width + 5) / 2),
        //     (3 * (this.canvas.height - height + 5) / 4),
        //     width - 5,
        //     height - 5
        // );
        // ctx.fill();
        // ctx.closePath();

        // ctx.beginPath();
        // ctx.fillStyle = "darkgrey";
        // ctx.rect(
        //     ((this.canvas.width - width + 10) / 2),
        //     (3 * (this.canvas.height - height + 10) / 4),
        //     width - 10,
        //     height - 10,
        // );
        // ctx.fill();
        // ctx.closePath();

        // ctx.beginPath();
        // ctx.fillStyle = "grey";
        // ctx.rect(
        //     ((this.canvas.width - width + 15) / 2),
        //     (3 * (this.canvas.height - height + 15) / 4),
        //     width - 15,
        //     height - 15,
        // );
        // ctx.fill();
        // ctx.closePath();

        // ctx.beginPath();
        // ctx.fillStyle = "darkgrey";
        // ctx.rect(
        //     ((this.canvas.width - width + 20) / 2),
        //     (3 * (this.canvas.height - height + 20) / 4),
        //     width - 20,
        //     height - 20,
        // );
        // ctx.fill();
        // ctx.closePath();

        // ctx.beginPath();
        // ctx.fillStyle = "grey";
        // ctx.rect(
        //     ((this.canvas.width - width + 25) / 2),
        //     (3 * (this.canvas.height - height + 25) / 4),
        //     width - 25,
        //     height - 25,
        // );
        // ctx.fill();
        // ctx.closePath();

        // ctx.closePath();
    }
}

export default Background;