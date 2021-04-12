import { Pipe } from '@angular/core';

const enum UNPIPED_STATS {
    Hp = 'hp',
    Attack = 'attack',
    Defense = 'defense',
    SpecialDefense = 'special-defense',
    SpecialAttack = 'special-attack',
    Speed = 'speed'
}

const enum PIPED_STATS {
    HP = 'HP',
    ATK = 'ATK',
    DEF = 'DEF',
    SDEF = 'SDEF',
    SATK = 'SATK',
    SPD = 'SPD'
}

@Pipe({ name: 'Stat' })
export class StatPipe {
    transform(stat: string): string {
        switch (stat) {
            case UNPIPED_STATS.Hp: {
                return PIPED_STATS.HP
            }

            case UNPIPED_STATS.Attack: {
                return PIPED_STATS.ATK
            }

            case UNPIPED_STATS.Defense: {
                return PIPED_STATS.DEF
            }

            case UNPIPED_STATS.SpecialAttack: {
                return PIPED_STATS.SATK
            }

            case UNPIPED_STATS.SpecialDefense: {
                return PIPED_STATS.SDEF
            }

            case UNPIPED_STATS.Speed: {
                return PIPED_STATS.SPD
            }

            default: {
                return ''
            }
        }
    }
}