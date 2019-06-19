import Wave from './Wave';
import { create } from 'domain';

export const TUTORIAL = 'TUTORIAL';
export const STAGE = 'STAGE';

const createTutorial1 = () => {
    const Wave1 = new Wave(4, true, true);
    Wave1.nextWave = newWave(6, true, true);

    return {
        type: TUTORIAL,
        firstWave: Wave1,
        waveCondition: noMoreEnemies,
        totalEnemies: 4,
    };
}

const enemiesLessThanHalf = (currEnemyCount) => {
    if (currEnemyCount <= this.enemyCount / 2) {
        return true;
    } else {
        return false;
    }
}

const noMoreEnemies = (currEnemyCount) => {
    if (currEnemyCount === 0) {
        return true;
    } else {
        return false;
    }
}

export const getLevelList = () => {
    const tutorialLevel = createTutorial1(); 

    return [ tutorialLevel ];
}