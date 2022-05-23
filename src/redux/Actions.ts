import { createAction } from "@reduxjs/toolkit";
import { Talent } from "../structs/Talent";
import { Token } from "../structs/Token";


// Create unit and add tokens
export const addUnit = createAction<{token: Token, talent: Talent}>("setup/unit/CREATE");
export const setUnitName = createAction<{id: number, name: string}>("setup/unit/name/SET");
export const addTokenToUnit = createAction<{id: number, token: Token, talent: Talent}>("setup/unit/tokens/ADD");
export const removeTokenFromUnit = createAction<{id: number, token: Token, talent: Talent}>("setup/unit/tokens/REMOVE");