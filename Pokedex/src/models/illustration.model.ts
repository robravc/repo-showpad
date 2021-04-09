export class Illustration {
    dream_world: IllustrationDetails
    official_artwork: IllustrationDetails
    
    constructor(dream_world: IllustrationDetails, official_artwork: IllustrationDetails) {
        this.dream_world = dream_world
        this.official_artwork = official_artwork
    }
}

export class IllustrationDetails {
    front_default: string
    front_female?: string 

    constructor(front_default: string, front_female?: string ) {
        this.front_default = front_default
        this.front_female = front_female
    }
}