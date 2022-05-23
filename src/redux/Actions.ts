import { createAction } from "@reduxjs/toolkit";
import { Talent } from "../structs/Talent";
import { Token } from "../structs/Token";


// Create unit and add tokens
export const addUnit = createAction<{playerId: string, token: Token, talent: Talent}>("setup/unit/CREATE");
export const setUnitName = createAction<{playerId: string, unitId: string, name: string}>("setup/unit/name/SET");
export const addTokenToUnit = createAction<{playerId: string, unitId: string, token: Token, talent: Talent}>("setup/unit/tokens/ADD");
export const removeTokenFromUnit = createAction<{playerId: string, unitId: string, token: Token, talent: Talent}>("setup/unit/tokens/REMOVE");