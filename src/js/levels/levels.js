import Wave from './Wave';

export const TUTORIAL = 'TUTORIAL';
export const STAGE = 'STAGE';

const createTutorial1 = () => {
    const linePositions = [
        // far left group
        { x: 100, y: 200 },
        { x: 90,  y: 170 },
        { x: 150, y: 240 },
        { x: 176, y: 200 },
        { x: 245, y: 200 },
        { x: 270, y: 219 },
        // far right group
        { x: 900,  y: 201 },
        { x: 960,  y: 250 },
        { x: 1000, y: 290 },
        { x: 980,  y: 310 },
        { x: 960,  y: 290 },
        { x: 990,  y: 345 },
        { x: 1020, y: 402 },
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
        { x: 610, y: 542 }
    ];

    const trianglePositions = [
        {x: 200, y: 200 },
    ];

    const Wave1 = new Wave(23, true, true, linePositions);
    Wave1.nextWave = new Wave(6, true, true, trianglePositions);

    return {
        type: TUTORIAL,
        currWave: Wave1,
        waveCondition: noMoreEnemies,
        totalEnemies: 4,
    };
}

const createLevel1 = () => {
    const wave1 = new Wave(10);
    const wave2 = new Wave(15);
    const wave3 = new Wave(20);
    const wave4 = new Wave(25);
    const wave5 = new Wave(30);

    wave1.nextWave = wave2;
    wave2.nextWave = wave3;
    wave3.nextWave = wave4;
    wave4.nextWave = wave5;

    return {
        type: STAGE,
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
    const tutorialLevel = createTutorial1();
    const level1 = createLevel1(); 

    return [ tutorialLevel, level1 ];
}