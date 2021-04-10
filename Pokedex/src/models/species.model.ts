import { Short } from "./short.model"

export class Species {
    base_happiness: number
    capture_rate: number
    color: Short
    gender_rate: number
    growth_rate: Short
    habitat: Short
    id: number
    is_baby: boolean
    is_legendary: boolean
    is_mythical: boolean
    name: string
    order: number
    shape: string

    constructor(
        base_happiness: number, 
        capture_rate: number, 
        color: Short,
        gender_rate: number, 
        growth_rate: Short, 
        habitat: Short, 
        id: number, 
        is_baby: boolean, 
        is_legendary: boolean, 
        is_mythical: boolean, 
        name: string, 
        order: number, 
        shape: string
    ) {
        this.base_happiness = base_happiness
        this.capture_rate = capture_rate
        this.color = color
        this.gender_rate = gender_rate
        this.growth_rate = growth_rate
        this.habitat = habitat
        this.id = id
        this.is_baby = is_baby
        this.is_legendary = is_legendary
        this.is_mythical = is_mythical
        this.name = name
        this.order = order
        this.shape = shape
    }
}