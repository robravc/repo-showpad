import { DamageRelation } from "./damage-relation.model"

export class Type {
    id: number
    name: string
    damageRelations: DamageRelation

  constructor(id: number, name: string, damageRelations: DamageRelation) {
    this.id = id
    this.name = name
    this.damageRelations = damageRelations
  }
}