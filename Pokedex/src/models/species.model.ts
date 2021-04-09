import { GrowthRate } from "./growth-rate.model"
import { Habitat } from "./habitat/habitat.model"

export class Species {
    baseHappiness: number
    captureRate: number
    genderRate: number
    growthRate: GrowthRate
    habitat: Habitat
    id: number
    isBaby: boolean
    isLegendary: boolean
    isMythical: boolean
    name: string
    order: number
    shape: string

    constructor(
        baseHappiness: number, 
        captureRate: number, 
        genderRate: number, 
        growthRate: GrowthRate, 
        habitat: Habitat, 
        id: number, 
        isBaby: boolean, 
        isLegendary: boolean, 
        isMythical: boolean, 
        name: string, 
        order: number, 
        shape: string
    ) {
        this.baseHappiness = baseHappiness
        this.captureRate = captureRate
        this.genderRate = genderRate
        this.growthRate = growthRate
        this.habitat = habitat
        this.id = id
        this.isBaby = isBaby
        this.isLegendary = isLegendary
        this.isMythical = isMythical
        this.name = name
        this.order = order
        this.shape = shape
    }
}