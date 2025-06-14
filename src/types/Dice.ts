import { isPlainObject } from "is-plain-object";

import { Die } from "./Die";

/**
 * The roll of a set of dice.
 * @example <caption>2d6 with a +6 bonus to the entire roll</caption>
 * {
 *  dice: [
 *    {id: "123", set: "NEUTRAL", type: "D6"},
 *    {id: "234", set: "NEUTRAL", type: "D6"},
 *  ],
 *  bonus: 6
 * }
 *
 * @example <caption>1d6+3 + 1d8</caption>
 * {
 *  dice: [
 *    {
 *      dice: [{id: "123", set: "NEUTRAL", type: "D6"}],
 *      bonus: 3
 *    },
 *    {id: "234", set: "NEUTRAL", type: "D8"}]
 *  ],
 * }
 *
 * @example <caption>A single D100 rolled with an added D10</caption>
 * {
 *  dice: [
 *    {id: "123", set: "NEUTRAL", type: "D100"},
 *    {id: "234", set: "NEUTRAL", type: "D10"}
 *  ],
 * }
 *
 */
export interface Dice {
  dice: Die[];
  bonus?: number;
}

export function isDice(value: any): value is Dice {
  return isPlainObject(value) && Array.isArray(value.dice);
}
