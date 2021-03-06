
class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.playerHeight = 40;
        this.playerWidth = 40;
        this.dx = 20;
        this.dy = 20;
        this.direction = 0;
        this.triangleEnergy = 100;
        this.triangleMax = 100;
        this.triangleCooldown = 1;
        this.lineEnergy = 60;
        this.lineMax = 60;
        this.lineCooldown = 1;
        
        this.position = { 
            x: canvas.width / 2,
            y: canvas.height - 100,
        };

        // document.addEventListener('keydown', e => {
        //     switch(e.code) {
        //         case 'KeyD':
        //             this.position.x += this.dx;
        //             break;
        //         case 'KeyA':
        //             this.position.x -= this.dx;
        //             break;
        //         case 'KeyW':
        //             this.position.y -= this.dy;
        //             break;
        //         case 'KeyS':
        //             this.position.y += this.dy;
        //             break;
        //         default:
        //             break;
        //     }

        //     this.checkBounds();
        // });
    }

    checkBounds() {
        if ( this.position.x > this.canvas.width - this.playerWidth) {
            this.position.x = this.canvas.width - this.playerWidth;
        } else if ( this.position.x < 0 ) {
            this.position.x = 0;
        } else if ( this.position.y > this.canvas.height - this.playerWidth ) {
            this.position.y = this.canvas.height - this.playerWidth;
        } else if ( this.position.y < 0 ) {
            this.position.y = 0;
        }
    }

    draw() {
        // const ctx = this.canvas.getContext('2d');
        // const wandPosition = {
        //     x: this.position.x + this.playerWidth + 10,
        //     y: this.position.y + 5,
        // }
        // const wandHeight = 25;
        // const wandWidth = 5;
        
        // ctx.fillStyle = 'purple';
        // ctx.fillRect(this.position.x, this.position.y, this.playerWidth, this.playerHeight);
        // ctx.fillStyle = 'black';
        // ctx.fillRect(wandPosition.x, wandPosition.y, wandWidth, wandHeight);
        // ctx.fillStyle = 'blue';
        // ctx.fillRect(wandPosition.x, wandPosition.y, wandWidth, 4);
        // ctx.strokeStyle = 'white';
        // ctx.lineWidth = 1;
        // ctx.strokeRect(wandPosition.x, wandPosition.y, wandWidth, 4);

        this.increaseCooldown();
    }

    increaseCooldown() {
        this.lineEnergy = this.lineEnergy < this.lineMax ? this.lineEnergy + this.lineCooldown : this.lineMax;
        this.triangleEnergy = this.triangleEnergy < this.triangleMax ? this.triangleEnergy + this.triangleCooldown : this.triangleMax;
    }

    readyLine() {
        if ( this.lineEnergy === this.lineMax ) {
            this.lineEnergy = 0;
            return true;
        } else {
            return false;
        }
    }

    readyTriangle() {
        if ( this.triangleEnergy === this.triangleMax ) {
            this.triangleEnergy = 0;
            return true;
        } else {
            return false;
        }
    }
}

export default Player;