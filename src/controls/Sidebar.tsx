import SimpleBar from "simplebar-react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { DicePicker } from "./DicePicker";
import { DiceExtras } from "./DiceExtras";
import { DiceHidden } from "./DiceHidden";
import { DiceHistory } from "./DiceHistory";
import { PluginGate } from "../plugin/PluginGate";
import { DiceRollSync } from "../plugin/DiceRollSync";
import { PartyTrays } from "../plugin/PartyTrays";
import { ResizeObserver as PluginResizeObserver } from "../plugin/ResizeObserver";
export function Sidebar() {
  return (
    <SimpleBar
      style={{
        maxHeight: "100vh",
        width: "64px",
        minWidth: "64px",
        overflowY: "auto",
      }}
    >
      <Stack p={1} gap={1} alignItems="center">
        <DiceExtras />
        <DicePicker />
        <Divider flexItem sx={{ mx: 1 }} />
        <DiceHidden />
        <PluginGate>
          <DiceRollSync />
          <PartyTrays />
          <PluginResizeObserver />
        </PluginGate>
        <Divider flexItem sx={{ mx: 1 }} />
        <DiceHistory />
      </Stack>
    </SimpleBar>
  );
}
