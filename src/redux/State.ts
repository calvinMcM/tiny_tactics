import { Unit } from "../structs/Unit"
import { uuid } from "../utilities/UUID"


export type State = {
    players: State.Player[],
    units: {[k: string]: Unit[]}, // Player id maps to a stream of units
    tokensRemaining: {[k: string]: number}
}

export module State{
    export type Player = {
        id: string,
        screenName: string,
    }
}

const defPlayers = [{id: uuid(), screenName: "Player 1"}, {id: uuid(), screenName: "Player 2"}]
export const defaultState: State = {
    players: defPlayers,
    units: Object.fromEntries(defPlayers.map(p => [p.id, []])), 
    tokensRemaining: Object.fromEntries(defPlayers.map(p => [p.id, 12])), 
}