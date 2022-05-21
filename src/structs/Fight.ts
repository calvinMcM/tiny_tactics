

/**
 * A Fight represents an interaction affecting one or more units.
 * In the "typical" case, it would involve one attacker and one defender. 
 * The attacker's action, health, and other stats may change, as might the defender's.
 * A fight is used to encapsulate the beginning and ending state of all parties, as well
 * as a memo of all discrete transforms needed to go between the two.
 * If the stats of the parties are represented as a matrix, the fight itself is simply 
 * the sum of transforms resulting from various abilities.
 * 
 * For instance, if the Attacker is swinging a sword at a Defender, we get the following:
 * 
 * [ H_a, P_a, D_a ] + [ 0,  2, 0 ] + [ 0,  0, -1 ]
 * [ H_d, P_d, D_a ]   [ -2, 1, 0 ]   [ 0, -1, -1 ]
 *      |                   |               |
 *      |                   |               \
 *      |                   \                Defender defensive skill reduces Inertia and costs both parties defense
 *      \                   Attacker's Inertia increases as a result of their talent usage
 *       Initial State
 * 
 * The number of transforms depends on the units involved. The attacker's talent(s) produce
 * transforms, as may the defender's. If multiple defenders are listed, their transforms are
 * included.
 * The nice thing here is that even if a Talent or other transform source uses random data,
 * the outcome of that non-deterministic source is memoized in the Fight, and can be saved.
 * The final (and maybe limiting) trick is that transforms are stateless - they do not
 * depend on (and should not read) previous or future transforms in the chain. They should
 * be treated as if they were fully associative with one another, such that the order in
 * which they are applied is unimportant.
 * 
 * The matrices above are mildly simplified. We'll need each row to also carry the id of
 * the corresponding unit (So that Talents and other reducers know which rows to change).
 * 
 * The fight may also need to take in map or position data, and may cause units to move,
 * change direction, or otherwise. At this point, there isn't a plan to do a bunch of
 * status effects or anything, but there may be a single "Incapacitated" flag that could
 * cause turns to be skipped.
 */

export class Fight{}