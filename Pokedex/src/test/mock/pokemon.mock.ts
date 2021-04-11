import { Short } from "src/models/short.model";
import { Stat } from "src/models/stat.model";

export const mockPokemon = {
    abilities: [],
    base_experience: 50,
    height: 50,
    id: 1,
    moves: [],
    name: 'PokeTester',
    order: 1,
    species: {
      name: 'PokeTester',
      url: 'https://pokeapi.co/api/v2/pokemon-species/1'
    },
    sprites: {
      front_default: 'hehe',
      other: {
        'official-artwork': {
          front_default: 'path-to-artwork'
        },
        dream_world: {
          front_default: 'hallo'
        }
      }
    },
    stats: [
      new Stat({
        name: 'jello',
        url: 'keineAhnung'
      }, 5)
    ],
    type:  new Short('normal', ''),
    weight: 100
  }