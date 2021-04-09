export class Characteristic {
    description: string
    highest_stat: string
    id: number
    
    constructor(description: string, highest_stat: string, id: number) {
        this.description = description
        this.highest_stat = highest_stat
        this.id = id
    }
}