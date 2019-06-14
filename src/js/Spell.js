class Spell {
    constructor({points, shape}) {
        this.shape = shape;
        this.points = points;
        this.life = 1;
        this.decay = 0.01;
    }

    draw(ctx) {
        if ( this.life <= 0 ) {
            return;
        }

        const start = this.points[0];

        ctx.fillStyle = this._determineFillColor(this.shape);
        ctx.strokeStyle = this._determineStrokeColor(this.shape);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        
        this.points.forEach( (point,idx) => {
            if ( idx > 0 ) {
                ctx.lineTo(point.x, point.y);

                if ( idx === this.points.length - 1) {
                    ctx.lineTo(start.x, start.y);
                }
            }
        });

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        this.life -= this.decay;
    }

    _determineFillColor(shape) {
        switch(shape) {
            case 'SQUARE':
                return 'red';
            case 'TRIANGLE':
                return 'blue';
            default:
                return null;
        }
    }

    _determineStrokeColor(shape) {
        switch (shape) {
            case 'SQUARE':
                return 'orange';
            case 'TRIANGLE':
                return 'lightblue';
            default:
                return null;
        }
    }
}

export default Spell;