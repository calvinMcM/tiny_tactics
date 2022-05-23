import { Unit } from "../structs/Unit"


export type State = {
    // Eventually this is TEAMS of units
    units: Unit[]
}


export const defaultState: State = {
    units: []
}