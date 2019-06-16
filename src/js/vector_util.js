
export const createVector = (point1, point2) => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    const radians = Math.atan2(dy, dx);
    const angle = radians * (180 / Math.PI);
    const length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    const direction = findDirection(angle);
    
    return { dx, dy, angle, direction, length };
}


export const findDirection = (angle) => {
    let direction = '';
    const relativeAngle = angle >= 0 ? angle % 360 : angle + 360;

    if (relativeAngle >= 337.5 || relativeAngle <= 22.5) {
        direction = 'N';
    } else if (relativeAngle >= 22.5 && relativeAngle <= 67.5) {
        direction = 'NE';
    } else if (relativeAngle >= 67.5 && relativeAngle <= 112.5) {
        direction = 'E';
    } else if (relativeAngle >= 112.5 && relativeAngle <= 157.5) {
        direction = 'SE';
    } else if (relativeAngle >= 157.5 && relativeAngle <= 202.5) {
        direction = 'S';
    } else if (relativeAngle >= 202.5 && relativeAngle <= 247.5) {
        direction = 'SW';
    } else if (relativeAngle >= 247.5 && relativeAngle <= 292.5) {
        direction = 'W';
    } else if (relativeAngle >= 292.5 && relativeAngle <= 337.5) {
        direction = 'NW';
    }

    return direction
}

export const findSmallestVector = (pointA, pointsArr) => {
    let smallest = { length: 1000 };

    pointsArr.forEach( pointB => {
        const newVector = createVector(pointA, pointB);
        
        if ( newVector.length < smallest.length ) {
            smallest = newVector;
        }
    });

    return smallest;
};

// Checks whether or not the position position is within the triangle.
// It checks if the point is on the left or right side of the line and assigns a positive or negative value
// The position is inside if all of the sides are either negative or positive but not a mix.
export const isPointInTriangle = (position, triCorners) => {
    let hasNegs = false, hasPos = false;
    const a = triCorners[0];
    const b = triCorners[1];
    const c = triCorners[2];
    
    const side1 = findSign(position, a, b);
    const side2 = findSign(position, b, c);
    const side3 = findSign(position, c, a);

    hasNegs = (side1 < 0) || (side2 < 0) || (side3 < 0);
    hasPos  = (side1 > 0) || (side2 > 0) || (side3 > 0);
    
    return !( hasNegs && hasPos );
};

// checks what side of the triangle the point
const findSign = (point, v1, v2) => {
    const x1 = point.x;
    const y1 = point.y;
    const x2 = v1.x;
    const y2 = v1.y;
    const x3 = v2.x;
    const y3 = v2.y;

    return (x1 - x3) * (y2 - y3) - (x2 - x3) * (y1 - y3);
}