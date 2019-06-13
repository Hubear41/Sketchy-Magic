
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

// export const findLongestVector = (pointA, pointsArr) => {
//     let largest = { length: 0 };

//     pointsArr.forEach( (pointB, idx2) => {
//         const newVector = createVector(pointA, pointB);
        
//         if ( newVector.length > largest.length ) {
//             largest = newVector;
//         }
//     });

//     return largest;
// }

export const findSmallestVector = (pointA, pointsArr) => {
    let smallest = { length: 1000 };
    let closest;

    pointsArr.forEach( pointB => {
        const newVector = createVector(pointA, pointB);
        
        if ( newVector.length < smallest.length ) {
            smallest = newVector;
            closest = pointB;
        }
});

    return smallest;
}