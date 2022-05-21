
export abstract class Talent{
    constructor(
        public readonly scopes: string[]
    ){}

    applyAttack<T>(data: T): T{return data};
    applyDefense<T>(data: T): T{return data};
    applyMovement<T>(data: T): T{return data};
    applyOther<T>(data: T): T{return data};
}

export module Talent{
    export enum SCOPE{
        ATTACK,
        DEFENSE,
        MOVEMENT,
        OTHER
    }
}