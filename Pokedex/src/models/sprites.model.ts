import { Illustration } from "./illustration.model"

export class Sprite {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
    other: Illustration

    constructor(
        back_default: string, 
        back_female: string, 
        back_shiny: string, 
        back_shiny_female: string, 
        front_default: string, 
        front_female: string, 
        front_shiny: string, 
        front_shiny_female: string, 
        other: Illustration
    ) {
        this.back_default = back_default
        this.back_female = back_female
        this.back_shiny = back_shiny
        this.back_shiny_female = back_shiny_female
        this.front_default = front_default
        this.front_female = front_female
        this.front_shiny = front_shiny
        this.front_shiny_female = front_shiny_female
        this.other = other
    }
}