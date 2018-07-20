import {MapScheme} from "../react/components/abstract/Map/index";
import PistolImage from '../../../assets/img/png/pistol.png'

// levelInfo1: {
//     number: 1,
//     description: 'Первой миссией является попадание внутрь небольшого наркопритона в черте города для нахождения улик и зацепок. Попасть внутрь решается через запасной ход',
//     icon: PistolImage,
//     mapScheme: [
//         MapScheme.hero,
//         MapScheme.thorns,
//         MapScheme.empty,
//         MapScheme.enemy,
//         MapScheme.empty
//         ],
//     messages: ['Начало игры']
//
export default {
    level1: {
        number: 1,
        description: 'Первой миссией является попадание внутрь небольшого наркопритона в черте города для нахождения улик и зацепок. Попасть внутрь решается через запасной ход',
        icon: PistolImage,
        mapScheme: [
            MapScheme.hero,
            MapScheme.thorns,
            MapScheme.empty,
            MapScheme.enemy,
            MapScheme.empty
        ],
        messages: ['Уровень 1']
    },
    level2: {
        number: 2,
        description: 'Вторая миссия: на пути появилась колючая проволока! Успей перепрыгнуть через нее',
        icon: PistolImage,
        mapScheme: [
            MapScheme.hero,
            MapScheme.thorns,
            MapScheme.empty,
            MapScheme.enemy,
            MapScheme.empty
        ],
        messages: ['Уровень 2']
    },
    level3: {
        number: 3,
        description: 'Вторая миссия: на пути появилась колючая проволока! Успей перепрыгнуть через нее',
        icon: PistolImage,
        mapScheme: [
            MapScheme.hero,
            MapScheme.thorns,
            MapScheme.empty,
            MapScheme.enemy,
            MapScheme.empty
        ],
        messages: ['Уровень 2']
    }
}