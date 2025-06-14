import { Dice, isDice } from "../types/Dice";
import { isDie } from "../types/Die";
import { Duality } from "../types/Duality";
import { RollResult } from "../types/RollResult";

/**
 * Check if the dice is a classical D100 roll with a D100
 * for the 10s unit and a D10 for the single digit.
 * If it is return the combined result.
 */
function checkD100Combination(
  dice: Dice,
  values: Record<string, number>
): number | null {
  const bonus = dice.bonus || 0;
  if (dice.dice.length === 2) {
    const d1 = dice.dice[0];
    const d2 = dice.dice[1];
    if (isDie(d1) && isDie(d2) && d1.type === "D100" && d2.type === "D10") {
      const v1 = values[d1.id];
      const v2 = values[d2.id];
      if (v1 !== undefined && v2 !== undefined) {
        if (v1 === 0 && v2 === 0) {
          return 100 + bonus;
        } else {
          return v1 + v2 + bonus;
        }
      }
    }
  }
  return null;
}

/**
 * Recursively get the final result for a roll of dice
 * @param dice
 * @param values A mapping of Die ID to their rolled value
 * @returns
 */
export function getRollResult(
  dice: Dice,
  values: Record<string, number>
): RollResult {
  let totalValue = dice.bonus || 0;
  let advantage = 0;
  let hope = 0;
  let fear = 0;
  let d100Seen = false;
  for (const d of dice.dice) {
    const value = values[d.id];
    switch (d.type) {
      case "ADVANTAGE":
        if (advantage >= 0) {
          advantage = Math.max(value, advantage);
        } else {
          console.error(
            "Cannot have Advantage and Disadvantage on the same roll"
          );;
        }
        break;
      case "DISADVANTAGE":
        if (advantage <= 0) {
          advantage = Math.min(-value, advantage);
        } else {
          console.error(
            "Cannot have Advantage and Disadvantage on the same roll"
          );
        }
        break;
      case "HOPE":
        hope += value;
        totalValue += value;
        break;
      case "FEAR":
        fear += value;
        totalValue += value;
        break;
      case "D100":
        d100Seen = true;
        totalValue += value;
        break;
      case "D10":
        if (!d100Seen && value === 0) {
          totalValue += 10;
        }
        d100Seen = false;
      default:
        totalValue += value;
    }
  }

  let duality: Duality | undefined;
  if (hope > 0 && fear > 0) {
    if (hope === fear) {
      duality = "CRIT";
    } else if (hope > fear) {
      duality = "HOPE";
    } else {
      duality = "FEAR";
    }
  }

  return {
    total: totalValue + advantage,
    duality,
  };
}
