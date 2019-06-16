class EnemyParticles {
    constructor( x, y ) {
        this.x = x;
        this.y = y;
        this.opacity = 1.0;
        this.decay = Math.random() * (0.1) + 0.01;
        this.delta = {
            dx: (Math.random() * 4) - 2,
            dy: (Math.random() * 4) - 2,
        };

        this.size = Math.random() * 5 + 5;
        this.state;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(0,255,255,${this.opacity})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.closePath();

        this.opacity -= this.decay;
        this.x += this.delta.dx;
        this.y += this.delta.dy;

        if (this.opacity <= 0) {
            this.state = DONE;
        }
    }
}

export default EnemyParticles;