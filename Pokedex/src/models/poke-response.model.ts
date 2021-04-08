import { Pokemon } from "./pokemon.model"

export class PokeResponse {
    page: number
    count: number
    next: string
    previous: string
    results: Pokemon[]

    constructor(
        page: number,
        count: number, 
        next: string, 
        previous: string, 
        results: Pokemon[]
    ) {
        this.page = page
        this.count = count
        this.next = next
        this.previous = previous
        this.results = results
    }
}