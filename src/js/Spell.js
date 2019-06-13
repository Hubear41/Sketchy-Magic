class Spell {
    constructor({points, position, shape}) {
        this.shape = shape;
        this.position = position;
        this.points = points;
        this.life = 1;
        this.decay = 0.1;
    }
}

export default Spell;