
import {createReducer} from '@reduxjs/toolkit'
import { Stats } from '../structs/Stats'
import { Unit } from '../structs/Unit'
import { addUnit } from './Actions'
import { State } from './State'


export default createReducer<State>(defaultState, builder => {
    builder.addCase(addUnit, (s, a) => {
        if(!s){
            return defaultState;
        }
        // Create UNIQUE id and maybe autogenerate a name someday.
        const unit = new Unit(0, "", new Stats(3,12), [a.payload.token], [a.payload.talent])
        return {
            ...s,
            units: [...s.units, unit ]
        }
    })
    // Add additional cases


})