export enum Token{
    SWORD,
    KNIFE,
    SHIELD,
    SPEAR,
    BOW,
    CLUB,

    FIRE,
    FROST,
    ETHER,
    SONIC,
    WATER,
    AIR
}

export module Token{
    export function getIconIndex(token: Token): number{
        switch(token){
            case Token.SWORD: return 0;
            case Token.KNIFE: return 1;
            case Token.SHIELD: return 2;
            case Token.SPEAR: return 3;
            case Token.BOW: return 4;
            case Token.CLUB: return 5;
            case Token.FIRE: return 6;
            case Token.FROST: return 7;
            case Token.ETHER: return 8;
            case Token.SONIC: return 9;
            case Token.WATER: return 10;
            case Token.AIR: return 11;
        }
    }
}