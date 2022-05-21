/**
 * Unlike many in it's genre, this game does not feature units with many nuanced stats.
 * At its core, the idea is to keep numbers small and manageable. You won't ever have 100HP
 * or take 85 points in damage. You'll have more like 3 HP, and might lose one to a regular
 * blow. Because it turns out that real people don't have 100HP - we have arms, legs, and
 * brains - damage to any of which can put us out of a fight.
 * 
 * We also scrap the notion of attack, defense, special attacks, speed, resistance, etc.
 * You have, at this point, only one other stat - Inertia. What that does and how it hinders
 * or aids you depends on your Talents - which vary from character to character.
 * A rogue-ish unit might move more often and do more damage, but suffer innaccuracy when
 * inertia is high, while a guardian unit would suffer less damage if it doesn't move and its
 * inertia is allowed to stay low. Wizards may have trouble casting large or accurate spells
 * when their inertia is too high (i.e. they're tired or distracted from overcasting).
 * Some units benefit more from different inertia levels than others. This stat is allowed
 * to be somewhat nuanced, though it mostly effects things like health or spaces one can
 * move, which are discrete and less finely-tuned.
 * 
 * The point in the end is that the stat's aren't as relevant as the talents you pair with
 * them, which defines a unit's abilities and - to some extent - their roles..
 */

export class Stats{
    constructor(
        public readonly h: number, // Health
        public readonly p: number, // Inertia
    ){}
}