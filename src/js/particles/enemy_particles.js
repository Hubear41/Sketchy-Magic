class EnemyParticles {
    constructor( x, y ) {
        this.x = x;
        this.y = y;
        this.opacity = 1.0;
        this.decay = Math.random() * (0.1) + 0.01;
        this.delta = {
            dx: (Math.random() * 2) - 1,
            dy: (Math.random() * 2) - 1,
        };

        this.size = Math.random() * 5 + 5;
        this.state;
        this.color = this._decideColor();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.opacity})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.closePath();

        this.opacity -= this.decay;
        this.x += this.delta.dx;
        this.y += this.delta.dy;

        if (this.opacity <= 0) {
            this.state = 'DONE';
        }
    }

    _decideColor() {
        const COLORS = [
            { r: 164, g: 42,  b: 42 },
            { r: 244, g: 229, b: 66 },
            { r: 188, g: 121, b: 33 },
            { r: 245, g: 252, b: 32 },
        ];

        const idx = Math.floor(Math.random() * 3);
        return COLORS[idx];
    }
}

export default EnemyParticles;