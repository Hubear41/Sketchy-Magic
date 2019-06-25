import Wave from './Wave';

export const TUTORIAL = 'TUTORIAL';
export const STAGE = 'STAGE';

const createLineTutorial = () => {
    const linePositions = [
        // left group
        { x: 100, y: 200 },
        { x: 90,  y: 170 },
        { x: 150, y: 240 },
        { x: 176, y: 200 },
        { x: 245, y: 200 },
        { x: 270, y: 219 },
        // center group
        { x: 600, y: 224 },
        { x: 580, y: 250 },
        { x: 608, y: 200 },
        { x: 570, y: 190 },
        { x: 570, y: 258 },
        { x: 570, y: 378 },
        { x: 590, y: 441 },
        { x: 590, y: 480 },
        { x: 600, y: 500 },
        { x: 610, y: 542 },
        // right group
        { x: 900,  y: 201 },
        { x: 960,  y: 250 },
        { x: 1000, y: 290 },
        { x: 980,  y: 310 },
        { x: 960,  y: 290 },
        { x: 990,  y: 345 },
        { x: 1020, y: 402 }
    ];

    const wave1 = new Wave(23, true, true, linePositions);

    return {
        type: TUTORIAL,
        name: 'Tutorial: Lines',
        description: 'Practice drawing lines to hit enemies',
        currWave: wave1,
        waveCondition: noMoreEnemies,
        totalEnemies: 23,
    };
}

const createTriangeTutorial = () => {
    const trianglePositions = [
        // left triangle
        { x: 200, y: 200 },
        { x: 184, y: 211 },
        { x: 110, y: 187 },
        { x: 300, y: 259 },
        { x: 290, y: 117 },
        { x: 265, y: 138 },
        // center triangle
        { x: 700, y: 524 },
        { x: 840, y: 478 },
        { x: 692, y: 558 },
        { x: 802, y: 523 },
        { x: 741, y: 449 },
        { x: 709, y: 407 },
        // right triangle 
        { x: 900,  y: 101 },
        { x: 1002, y: 303 },
        { x: 952,  y: 275 },
        { x: 1048, y: 221 },
        { x: 879,  y: 156 },
        { x: 987,  y: 321 },
    ];

    const wave = new Wave(23, true, true, trianglePositions);
    return {
        type: TUTORIAL,
        name: 'Tutorial: Triangles',
        description: 'Practice drawing triangles to hit enemies',
        currWave: wave,
        waveCondition: noMoreEnemies,
        totalEnemies: 23
    }
}

const createLevel1 = () => {
    const wave1 = new Wave(5);
    const wave2 = new Wave(9);
    const wave3 = new Wave(9);
    const wave4 = new Wave(12);
    const wave5 = new Wave(12);

    wave1.nextWave = wave2;
    wave2.nextWave = wave3;
    wave3.nextWave = wave4;
    wave4.nextWave = wave5;

    return {
        type: STAGE,
        name: 'Level 1',
        description: 'Protect your treasure at all costs',
        currWave: wave1,
        waveCondition: enemiesLessThanHalf,
        totalEnemies: 100
    }
}

const enemiesLessThanHalf = (enemyCount, totalEnemies) => {
    if (enemyCount <= totalEnemies / 2) {
        return true;
    } else {
        return false;
    }
}

const noMoreEnemies = enemyCount => {
    if (enemyCount === 0) {
        return true;
    } else {
        return false;
    }
}

export const getLevelList = () => {
    const tutorial1 = createLineTutorial();
    const tutorial2 = createTriangeTutorial();
    const level1 = createLevel1(); 

    return [ 
        tutorial1, 
        tutorial2,
        level1 
    ];
}