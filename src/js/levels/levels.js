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
        name: 'Practice: Line Spell',
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
        name: 'Practice: Triangle Spell',
        description: 'Practice drawing triangles to hit enemies',
        currWave: wave,
        waveCondition: noMoreEnemies,
        totalEnemies: 23
    }
}

const createLevel1 = () => {
    const wave1 = new Wave(4);
    const wave2 = new Wave(4);
    const wave3 = new Wave(5);
    const wave4 = new Wave(6);
    const wave5 = new Wave(10);

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
        totalEnemies: 48
    }
}

const createLevel2 = () => {
    const wave1 = new Wave(10);
    const wave2 = new Wave(10);
    const wave3 = new Wave(12);
    const wave4 = new Wave(12);
    const wave5 = new Wave(14);
    const wave6 = new Wave(14);

    wave1.nextWave = wave2;
    wave2.nextWave = wave3;
    wave3.nextWave = wave4;
    wave4.nextWave = wave5;
    wave5.nextWave = wave6;

    return {
        type: STAGE,
        name: 'Level 2',
        description: 'Protect your treasure at all costs',
        currWave: wave1,
        waveCondition: enemiesLessThanHalf,
        totalEnemies: 72
    }
}

const createLevel3 = () => {
    const wave1 = new Wave(14);
    const wave2 = new Wave(16);
    const wave3 = new Wave(22);
    const wave4 = new Wave(25);
    const wave5 = new Wave(28);
    const wave6 = new Wave(30);

    wave1.nextWave = wave2;
    wave2.nextWave = wave3;
    wave3.nextWave = wave4;
    wave4.nextWave = wave5;
    wave5.nextWave = wave6;

    return {
        type: STAGE,
        name: 'Level 3',
        description: 'Becareful, their numbers are increasing',
        currWave: wave1,
        waveCondition: enemiesLessThanHalf,
        totalEnemies: 108
    }
}

const createLevel4 = () => {
    const wave1 = new Wave(20);
    const wave2 = new Wave(120);

    wave1.nextWave = wave2;

    return {
        type: STAGE,
        name: 'Level 4',
        description: 'Something\'s different. Stay Sharp!',
        currWave: wave1,
        waveCondition: enemiesLessThanHalf,
        totalEnemies: 144
    }
}

const createLevel5 = () => {
    const wave1 = new Wave(50);
    const wave2 = new Wave(78);
    const wave3 = new Wave(90);
    const wave4 = new Wave(102);
    const wave5 = new Wave(119);
    const wave6 = new Wave(130);

    wave1.nextWave = wave2;
    wave2.nextWave = wave3;
    wave3.nextWave = wave4;
    wave4.nextWave = wave5;
    wave5.nextWave = wave6;

    return {
        type: STAGE,
        name: 'Level 5',
        description: 'Watchout! They\'re sending everything that they\'ve got',
        currWave: wave1,
        waveCondition: enemiesLessThanHalf,
        totalEnemies: 219
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

export const getLevels = () => {
    const level1 = createLevel1(); 
    const level2 = createLevel2();
    const level3 = createLevel3();
    const level4 = createLevel4();
    const level5 = createLevel5();

    return [ 
        level1,
        level2,
        level3,
        level4,
        level5
    ];
}

export const getPractice = num => {
    const line = createLineTutorial();
    const triangle = createTriangeTutorial(); 

    if ( num === 0 ) {
        return [ line ];
    } else {
        return [ triangle ];
    }
}