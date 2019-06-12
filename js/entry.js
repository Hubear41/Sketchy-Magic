import { draw } from './Sketchy_Magic';
import shapeFinder from './shape_finder'
import { Rectangle, Path, view, Point } from 'paper';

document.addEventListener('DOMContentLoaded', () => {
    let paperCanvas = document.getElementById('paperCanvas');
    let mainCanvas = document.getElementById('mainCanvas');
    let ctx = mainCanvas.getContext('2d');
    
    paper.setup(paperCanvas);
    debugger
    let tool = new Tool();
    const shapes = new shapeFinder(tool, mainCanvas);
    // let rectangle = new Rectangle( new Point(50, 50), new Point(150, 100) )

    // let pedastal = new Path.Rectangle(new Rectangle(new Point(50, 50), new Point(150, 100)));

    document.addEventListener('mouseup', () => {
        const { shape, path, position } = shapes;
        // debugger
        ctx.moveTo(position.x, position.y);
    });
    
    draw(mainCanvas);
});

