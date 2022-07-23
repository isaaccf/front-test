import { Wand } from "./Wand"

export type Character = {
  id:number,
  name: string,
  house: string,
  species: string,
  gender: string,
  dateOfBirth: string,
  yearOfBirth: string,
  wizard: boolean,
  ancestry: string,
  eyeColour: string,
  hairColour: string,
  patronus: string,
  hogwartsStudent:boolean,
  hogwartsStaff: boolean,
  actor: string,
  alive: boolean,
  image: string,
  alternate_names: string[],
  alternate_actors: string[],
  wand: Wand
}