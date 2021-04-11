import { Short } from "./short.model"

export class Type {
  slot: number
  type: Short

  constructor(slot: number, type: Short) {
    this.slot = slot
    this.type = type
  }
}