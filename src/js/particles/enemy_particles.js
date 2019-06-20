class EnemyParticles {
    constructor( x, y ) {
        this.x = x;
        this.y = y;
        this.lifespan = 7;
        this.decay = 0.5;
        this.delta = {
            dx: (Math.random() * 2) - 1,
            dy: (Math.random() * 2) - 1,
        };

        this.size = 100;
        this.state;
        this.setupSprite();
    }

    draw(ctx) {
        const currentFrame = Math.floor((7 - this.lifespan) + 1);
        const spriteSize = 34;
        let spriteX, spriteY;

        if ( currentFrame === 1 ) {
            spriteX = 7 * spriteSize;
            spriteY = 3 * spriteSize;
        } else {
            spriteX = (currentFrame - 2) * spriteSize;
            spriteY = 4 * spriteSize;
        }

        ctx.drawImage(  this.explosionImage,
                        spriteX,
                        spriteY,
                        spriteSize,
                        spriteSize,
                        this.x - this.size / 2,
                        this.y - this.size / 2,
                        this.size,
                        this.size
        );
        
        this.lifespan -= this.decay;

        if (this.lifespan <= 0) {
            this.state = 'DONE';
        }
    }

    setupSprite() {
        this.explosionImage = new Image();
        this.explosionImage.src = 'assets/Explosions/FX.png';
    }
}

export default EnemyParticles;