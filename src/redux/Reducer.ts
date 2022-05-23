
import {createReducer} from '@reduxjs/toolkit'
import { Stats } from '../structs/Stats'
import { Unit } from '../structs/Unit'
import { uuid } from '../utilities/UUID'
import { addUnit, setUnitName } from './Actions'
import { defaultState, State } from './State'

function iterwrite<T>(base: T, addition: Partial<T>, core: [] | {} = {}): T {
    return Object.assign(core, base, addition) as T;
}

export default createReducer<State>(defaultState, builder => {
    builder.addCase(addUnit, (s, a) => {
        if(!s){
            s = defaultState;
        }

        // If the player is out of tokens, the action is not valid.
        if(s.tokensRemaining[a.payload.playerId] == 0){ 
            return s;
        }

        const unit = new Unit(uuid(), "", new Stats(3,12), [a.payload.token], [a.payload.talent]);
        return iterwrite(s, {
            units: iterwrite(s.units, {
                [a.payload.playerId]: [...s.units[a.payload.playerId], unit] // Append the unit to the player's array.
            }),
            tokensRemaining: iterwrite(s.tokensRemaining, {
                [a.payload.playerId]: s.tokensRemaining[a.payload.playerId] - 1
            })
        })
    })
    builder.addCase(setUnitName, (s, a) => {
        if(!s){
            s = defaultState;
        }

        return iterwrite(s, {
            units: iterwrite(s.units, {
                [a.payload.playerId]: s.units[a.payload.playerId].map(u => {
                    if(u.id !== a.payload.unitId){
                        return u;
                    }
                    return {...u, name: a.payload.name}
                }) // find and rename the unit.
            })
        })
    })

    // Add additional cases...


})