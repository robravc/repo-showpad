export class PokeResponse {
    page: number
    count: number
    next: string
    previous: string
    results: any

    constructor(
        page: number,
        count: number, 
        next: string, 
        previous: string, 
        results: any
    ) {
        this.page = page
        this.count = count
        this.next = next
        this.previous = previous
        this.results = results
    }
}