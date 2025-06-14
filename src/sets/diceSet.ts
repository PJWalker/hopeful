import { DiceSet } from "../types/DiceSet";
import { Die } from "../types/Die";
const id = `STANDARD`;

const standardSet: DiceSet = {
  id,
  name: `dice`,
  dice: [
    { id: `${id}_HOPE`, type: "HOPE" },
    { id: `${id}_ADVANTAGE`, type: "ADVANTAGE" },
    { id: `${id}_DISADVANTAGE`, type: "DISADVANTAGE" },
    { id: `${id}_D4`, type: "D4" },
    { id: `${id}_D6`, type: "D6" },
    { id: `${id}_D8`, type: "D8" },
    { id: `${id}_D10`, type: "D10" },
    { id: `${id}_D12`, type: "D12" },
    { id: `${id}_D20`, type: "D20" },
    { id: `${id}_D100`, type: "D100" },
  ],
};

const standardSets = [standardSet];

export default standardSet;
