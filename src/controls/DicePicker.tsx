import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

import { DicePreview } from "../previews/DicePreview";

import { useDiceControlsStore } from "./store";
import { useDiceRollStore } from "../dice/store";

export function DicePicker() {
  const counts = useDiceControlsStore((state) => state.diceCounts);

  const diceById = useDiceControlsStore((state) => state.diceById);
  const handleDiceCountIncrease = useDiceControlsStore(
    (state) => state.incrementDieCount
  );
  const clearRoll = useDiceRollStore((state) => state.clearRoll);
  const roll = useDiceRollStore((state) => state.roll);
  function clearRollIfNeeded() {
    if (roll) {
      clearRoll();
    }
  }

  return (
    <>
      {Object.entries(counts).map(([id, count]) => {
        const die = diceById[id];
        if (!die) {
          return null;
        }
        return (
          <IconButton
            onClick={() => {
              handleDiceCountIncrease(id);
              clearRollIfNeeded();
            }}
            sx={{ p: 0 }}
          >
            <DicePreview diceType={die.type} />
          </IconButton>
        );
      })}
    </>
  );
}
