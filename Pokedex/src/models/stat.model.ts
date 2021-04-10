export class Stat {
    stat: { name: string, url: string }
    base_stat: number

    constructor(stat: { name: string, url: string }, base_stat: number) {
        this.stat = stat
        this.base_stat = base_stat
    }
}