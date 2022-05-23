import { Stats } from "./Stats";
import { Talent } from "./Talent";
import { Token } from "./Token";


export class Unit{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly stats: Stats,
        public readonly tokens: Token[],
        public readonly talents: Talent[],
    ){}
}
