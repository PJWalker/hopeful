import { useMemo } from "react";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Grow from "@mui/material/Grow";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import { getRollResult } from "../helpers/getRollResult";
import { DiceRoll } from "../types/DiceRoll";
import { Die, isDie } from "../types/Die";
import { Dice, isDice } from "../types/Dice";
import { DicePreview } from "../previews/DicePreview";
import { Duality } from "../types/Duality";

function checkDualityDice(
  dice: Dice,
  values: Record<string, number>
): Duality | null {
  if (dice.dice.length >= 2) {
    const hopeDie = dice.dice.find((d: any) => d.style === "HOPE");
    const fearDie = dice.dice.find((d: any) => d.style === "FEAR");
    if (isDie(hopeDie) && isDie(fearDie)) {
      const hopeRoll = values[hopeDie.id];
      const fearRoll = values[fearDie.id];
      if (hopeRoll > fearRoll) {
        return "HOPE";
      }
      if (fearRoll > hopeRoll) {
        return "FEAR";
      }
      if (fearRoll === hopeRoll) {
        return "CRIT";
      }
    }
  }
  return null;
}

export function DiceResults({
  diceRoll,
  rollValues,
  expanded,
  onExpand,
}: {
  diceRoll: DiceRoll;
  rollValues: Record<string, number>;
  expanded: boolean;
  onExpand: (expand: boolean) => void;
}) {
  const finalValue = useMemo(() => {
    const { total, duality } = getRollResult(diceRoll, rollValues);
    if (!duality) {
      return total;
    }
    if (duality === "CRIT") {
      return "CRITICAL SUCCESS!";
    }

    return `${total} with ${duality}`;
  }, [diceRoll, rollValues]);

  return (
    <Stack alignItems="center" maxHeight="calc(100vh - 100px)">
      <Typography variant="h4" color="white" align="center">
        {finalValue}
      </Typography>
    </Stack>
  );
}
