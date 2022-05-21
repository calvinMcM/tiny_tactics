# Tiny Tactics
This is a minimal, scenario-facing attempt at a strategy RPG. 
It comes in the vein of Final Fantasy Tactics, Tactics Ogre, and many more recent additions to the genre.
The objective is to create something small enough to run on any device capable of accessing the internet,
and simple enough to make the controls intuitive and powerful on all media.

# Target

This game is currently not an adventure game. Someday maybe it will be. For now, it's local co-op of only 2-4 players.
It's designed for the web, but should be runnable on almost any device that can access the modern browsers.
Simplicy in the favor of Strategy

# Rules

## Game Setup
A board is created for play. It is roughly 16x16 spaces across, and height mapped. The dimensions may be flexible depending
on inputs from the players (local play only for now).

Each player is given a bank of tokens. The tokens can be spent to provide talents and abilities to individual units.
The player can decide how many units they are going to deploy on their side, and spread the tokens and abilities among them.
Every unit must have at least one token, and may have no more than five.

If the bank size is, for example, 20, Alice may decide to staff her side of the field with 4 units, with 5 tokens each. Bob
however may instead opt for a team of 20 units, each with a single token. Alice's units will have a wider range of skills,
abilities, benefits, etc that make them substantially better than Bob's units, while Bob's units have relatively little
flexibility and rely on numbers to make a difference.

## Token Types

There are, at this junction, 12 different token types. They represent different means of both physical and magical ability.

* Sword - Basic sword skills, which often lean toward melee abilities
* Knife - Melee abilities with an emphasis on speed rather than might
* Shield - Strongly defensive, provides resistances and may benefit from less movement
* Spear - Some small range, pairs with powerful, well-timed blows.
* Bow - Good range, reasonable speed
* Club - Powerful hits, encompasses all blunt-force-style attacks
* Fire - Basic combat abilities, can sometimes spread or cause other setbacks
* Frost - Less emphasis on direct combat, more emphasis on defense and debuffs
* Ether - Lightning and Light-based talents. Either lots of power, or little
* Water - Basic water abilities, which frequently interact with other magics
* Air - Movement buffs (debuffs) and moving units around - sometimes against their wills

## Talent Trees
Once a unit is assigned a token, they may choose how to spend that token in a "skill tree" of sorts. The tree should not
be more than 5 skills high, and largely benefits from remaining flatter than taller.

For instance, the fire tree *may* look like:

* Firebolt - throw fire across a small range. Impacts the first target hit for 2 damage. Cannot be cast at high inertia. (Projectile)
    * Bigger bolt - extends the range and power of the above by 1 each.
* Flamethrower - spray fire at an adjacent opponent, causing 1-2 damage. Cannot be cast at max inertia.  (Beam)
    * Spitter - increases the range and damage of flamethrower. Hits targets in a line. Cannot be cast at high inertia.
        * Plasma Beam - Increases range and damage of flamethrower, hitting targets in a line. Cannot be cast at moderate or high inertia.
* Bomb - throw an incendiary bomb at a nearby opponent, causing 1 damage in the target square and 0-1 damage in adjacent squares (AOE)
    * Many Little Fires - sharply increases the chance of AOE damage, and may cause natural features to ignite
    * Concussion - Bombs no longer hit adjacent squares, but do 2 damage and knock the opponent backward, possibly causing additional harm
* Thermodynamist - reduces the Inertia cost of abilities
* Pyromaniac - Adds 1 damage to all attacks
* Arsonist - Combustible natural features struck by fire attacks are guaranteed to ignite
* Hot Stove - Deals one damage to any opponent who damages you
* Heat Stroke - Deals damage to an attacker based on their inertia
* Burned at Both Ends - when inertia is too high, automatically use your own body for energy - reducing inertia and health

And so on. This is just an example of a wide, but not deep tree.

## Unit Stats

Unlike many RPG's, this game will not feature many nuanced stats and growth. There are also not many "Conditions" such as poison,
paralysis, enamourment, etc. There only two right now - Incapacitated, and Hampered. Because when a human being is burned, stunned,
blinded, dismembered, etc., it really just results in them being extra vulnerable and even unable to act or do anything for the
battle. Also, poison on the battlefield isn't usually about draining them of strength while they're fighting - it's about making
sure that an injured unit never gets well.

The two stats in the game are:
1. HP - the unit's "health". Unlike other games with big numbers, this game will keep the numbers low - maybe 3 for most units, with some talents granting additional health or some healing abilities
2. Inertia - this measure's a unit's "activeness". Using abilities or moving around the field generates inertia. Defending or taking damage can as well. Being high inertia isn't bad - rogue-types or other "fast" units may actually benefit from it by having higher turn speed (though maybe lower accuracy). Magic classes may suffer poor accuracy or even inability to cast spells at high inertia though. Low inertia may lend defense and accuracy to certain talents, but if kept too low may reduce the unit's movement potential and turn speed.

The remaining stats (speed, accuracy, defense, etc) are never actively tracked - they are calculated when needed based on talents and the units' health and inertia. Lower health may automatically reduce the effectiveness of some moves at some points.

Possessing certain tokens at all may yield some benefits outside of the skill tree, but at this point that's not planned. But there may be a case for having some
tokens raise or lower a unit's inertia at the beginning of the battle scenario.

Units do not possess levels in this scanrio. Their battle proficiency and prowess is measured in skills, not in stats.

## Turn Structure
At the end of each turn, the turn order is recalculated based on:

1. Each unit's inertia
2. The last time each unit moved

Units with higher inertia will in general be able to move more frequently than those with low inertia. Therefore some units may have two turns before others get one. The possible exception is on the first turn, where everybody gets to go at least once before anybody gets a second turn.

The turn of a unit is divided into two sections, the order of which isn't important:

1. Movement - Builds inertia, and high-inertia units may have their movement range situationally increased
2. Act - use a talent

Each phase may be used once per turn, and may be restricted in some cases if the target is Incapacitated (Turn skipped) or Hampered (Action phase disallowed). Some actions may not be usable in too-high or too-low inertia or health circumstances.

At the end of each turn, the turn order is recalculated, and the next unit moves.

In some cases, the game may end if no opposing units remain on the field or some objective set has been met at the end of a unit's turn.

## Battle Calculation

A fight represents an interaction affecting one or more units. In the "typical" case, it would involve one attacker and one defender. 

The attacker's action, health, and inertia may change, as might the defender's. A Fight object is used to encapsulate the beginning and ending state of all parties, as well as a memo of all discrete transforms needed to go between the two.

The stats of the parties are represented by discrete matrices, the outcome of the fight simply being the sum of transforms resulting from various abilities.

For instance, if the Attacker is swinging a sword at a single Defender, we get the following:

[ H_att, I_att ] + [ 0,  2 ] + [ 0,  1 ]
[ H_def, I_def ]   [ -2, 1 ]   [ 0, -1 ]
     |             |           |
     |             |            \
     |              \            Defender's defensive talent reduces Inertia and costs both parties defense
     \               Attacker's Inertia increases as a result of their talent usage
      Initial State

The number of transforms depends on the units involved. The attacker's talent(s) should produce transforms, as may the defender's. If multiple defenders are listed, their transforms are included.

The _Big Idea_ in the transforms though is that they are completely stateless. When producing its effect matrix, a talent does not know about the effect of any other matrices - or even if there are any. It receives simply the initial state and position data for the units involved, and produces its effect matrix. Doesn't know about
any other talents or skills at this point. This means that the transforms can be moved around or organized as needed - or even be calculated concurrently without needing to know about one another.

This may produce some interesting scenarios. There can't be a concept of "armor", because you can't reduce damage without knowing what damage - if any - was done. The damage transforms from an attack aren't known to the defender, so it can't "reduce" the damage. There are two grand solutions to this problem:

1. Grant some transforms awareness of previous calculations. We may have a two-phase system that does preliminary calculations on some things, and then a second stage based on the result of the first. But I don't like that so much.
2. Ignore the problem. The shield talent tree may simply restore 1 health when attacked if base health at the start of the attack is less than some threshold - regardless of what damage the attack did or did not do (e.g. if the attack misses completely, the unit still gets the health boost).

I like the second solution better and it makes for an easier calculation strategy.