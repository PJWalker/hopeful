import { useRef, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { useDiceControlsStore } from "./store";
import { useDiceRollStore } from "../dice/store";
import { Stack, TextField } from "@mui/material";
import { StatPicker } from "./StatPicker";

export function DiceExtras() {
  const bonus = useDiceControlsStore((state) => state.diceBonus);
  const setBonus = useDiceControlsStore((state) => state.setDiceBonus);
  let delta = useRef(0);
  const clearRoll = useDiceRollStore((state) => state.clearRoll);
  const roll = useDiceRollStore((state) => state.roll);
  function clearRollIfNeeded() {
    if (roll) {
      clearRoll();
    }
  }

  /** Controls (bonus and adv/dis) */

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <Tooltip
      id="more-menu"
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      placement="right-start"
      leaveDelay={300}
      title={
        <Stack>
          <StatPicker
            close={handleClose}
            bonus={bonus}
            onChange={(bonus) => {
              setBonus(bonus);
              clearRollIfNeeded();
            }}
          />
        </Stack>
      }
    >
      <TextField
        hiddenLabel
        size="small"
        value={bonus}
        type="number"
        onWheel={(e) => {
          delta.current += e.deltaY;
          if (Math.abs(delta.current) > 100) {
            setBonus(bonus + Math.sign(delta.current));
            delta.current = 0;
          }
        }}
        inputProps={{
          style: {
            padding: "0.5rem 0.25rem",
            textAlign: "center",
          },
        }}
        onChange={(e) => setBonus(Number(e.target.value))}
      />
    </Tooltip>
  );
}
