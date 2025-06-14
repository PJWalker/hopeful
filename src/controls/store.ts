import {create} from "zustand";
import { immer } from "zustand/middleware/immer";
import { Dice } from "../types/Dice";
import { DiceSet } from "../types/DiceSet";
import { Die } from "../types/Die";
import { generateDiceId } from "../helpers/generateDiceId";
import diceSet from "../sets/diceSet";

export type DiceCounts = Record<string, number>;

interface DiceControlsState {
  diceSet: DiceSet;
  diceById: Record<string, Die>;
  defaultDiceCounts: DiceCounts;
  diceCounts: DiceCounts;
  diceBonus: number;
  diceHidden: boolean;
  diceRollPressTime: number | null;
  fairnessTesterOpen: boolean;
  resetDiceCounts: () => void;
  changeDieCount: (id: string, count: number) => void;
  incrementDieCount: (id: string) => void;
  decrementDieCount: (id: string) => void;
  setDiceBonus: (bonus: number) => void;
  toggleDiceHidden: () => void;
  setDiceRollPressTime: (time: number | null) => void;
  toggleFairnessTester: () => void;
}

const initialDiceCounts = getDiceCountsFromSet(diceSet);
const initialDiceById = getDiceByIdFromSet(diceSet);

export const useDiceControlsStore = create<DiceControlsState>()(
  immer((set) => ({
    diceSet,
    diceById: initialDiceById,
    defaultDiceCounts: initialDiceCounts,
    diceCounts: initialDiceCounts,
    diceBonus: 0,
    diceHidden: false,
    diceRollPressTime: null,
    fairnessTesterOpen: false,
    resetDiceCounts() {
      set((state) => {
        state.diceCounts = state.defaultDiceCounts;
      });
    },
    changeDieCount(id, count) {
      set((state) => {
        if (id in state.diceCounts) {
          state.diceCounts[id] = count;
        }
      });
    },
    incrementDieCount(id) {
      set((state) => {
        if (id in state.diceCounts) {
          state.diceCounts[id] += 1;
        }
      });
    },
    decrementDieCount(id) {
      set((state) => {
        if (id in state.diceCounts) {
          state.diceCounts[id] -= 1;
        }
      });
    },
    setDiceBonus(bonus) {
      set((state) => {
        state.diceBonus = bonus;
      });
    },
    toggleDiceHidden() {
      set((state) => {
        state.diceHidden = !state.diceHidden;
      });
    },
    setDiceRollPressTime(time) {
      set((state) => {
        state.diceRollPressTime = time;
      });
    },
    toggleFairnessTester() {
      set((state) => {
        state.fairnessTesterOpen = !state.fairnessTesterOpen;
      });
    },
  }))
);

function getDiceCountsFromSet(diceSet: DiceSet) {
  const counts: Record<string, number> = {};
  for (const die of diceSet.dice) {
    counts[die.id] = 0;
  }
  return counts;
}

function getDiceByIdFromSet(diceSet: DiceSet) {
  const byId: Record<string, Die> = {};
  for (const die of diceSet.dice) {
    byId[die.id] = die;
  }
  return byId;
}

/** Generate new dice based off of a set of counts and die */
export function getDiceToRoll(
  counts: DiceCounts,
  diceById: Record<string, Die>
) {
  const dice: Die[] = [];
  const countEntries = Object.entries(counts);
  for (const [id, count] of countEntries) {
    const die = diceById[id];
    if (!die) {
      continue;
    }
    const { type } = die;
    for (let i = 0; i < count; i++) {
      switch (type) {
        case "D100":
          // Push a d100 and d10 when rolling a d100
          dice.push(
            { id: generateDiceId(), type: "D100" },
            { id: generateDiceId(), type: "D10" }
          );
          break;
        case "HOPE":
          // Push a Fear when rolling Hope
          dice.push(
            { id: generateDiceId(), type: "HOPE" },
            { id: generateDiceId(), type: "FEAR" }
          );
          break;
        case "ADVANTAGE":
          // Remove the first dice with type 'DISADVANTAGE'
          const disadvantageIndex = dice.findIndex(
            (die) => die.type === "DISADVANTAGE"
          );
          if (disadvantageIndex !== -1) {
            dice.splice(disadvantageIndex, 1);
            break;
          }
          dice.push({ id: generateDiceId(), type });
          break;
        case "DISADVANTAGE":
          // Remove the first dice with type 'ADVANTAGE'
          const advantageIndex = dice.findIndex(
            (die) => die.type === "ADVANTAGE"
          );
          if (advantageIndex !== -1) {
            dice.splice(advantageIndex, 1);
            break;
          }
          dice.push({ id: generateDiceId(), type });
          break;
        default:
          dice.push({ id: generateDiceId(), type });
          break;
      }
    }
  }
  return dice;
}
