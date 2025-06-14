import {
  useEffect,
  useLayoutEffect,
  useState,
  useSyncExternalStore,
} from "react";
import OBR from "@owlbear-rodeo/sdk";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ListItemText from "@mui/material/ListItemText";
import { Button, ButtonGroup, List } from "@mui/material";

const setDefaults = async () => {
  const metadata = await OBR.player.getMetadata();
  console.log(metadata);
  if (!metadata["io.github.pjwalker.dice.stats"]) {
    await OBR.player.setMetadata({
      "io.github.pjwalker.dice.stats": {
        Agility: 0,
        Strength: -1,
        Finesse: 1,
        Instinct: 0,
        Presence: 3,
        Knowledge: 2,
      },
    });
  }
  return OBR.player.getMetadata();
};

const useMetadata = (key: string) => {
  const [metadata, setMetadata] = useState<Record<string, any>>({});
  useLayoutEffect(() => {
    OBR.player.onChange((player) => {
      OBR.player
        .getMetadata()
        .then((metadata) => setMetadata({ [key]: metadata[key] }));
    });
    setDefaults();
    OBR.player
      .getMetadata()
      .then((metadata) => setMetadata({ [key]: metadata[key] }));
  }, []);
  return metadata[key];
};

type StatPickerProps = {
  bonus: number;
  onChange: (bonus: number) => void;
  close: () => void;
};

export function StatPicker({ bonus, onChange, close }: StatPickerProps) {
  const stats = useMetadata("io.github.pjwalker.dice.stats");

  console.log(stats);

  const handleIncrement = (stat: string) => {
    const newStats = { ...stats, [stat]: stats[stat] + 1 };
    OBR.player.setMetadata({ "io.github.pjwalker.dice.stats": newStats });
  };

  const handleDecrement = (stat: string) => {
    const newStats = { ...stats, [stat]: stats[stat] - 1 };
    OBR.player.setMetadata({ "io.github.pjwalker.dice.stats": newStats });
  };

  return (
    stats && (
      <>
        <List dense={true} disablePadding={true}>
          {Object.keys(stats).map((stat) => (
            <ListItem disableGutters={true} key={stat}>
              <ListItemButton
                onClick={() => {
                  onChange(stats[stat]);
                  close();
                }}
              >
                <ListItemText secondary={<>{stat}</>}>
                  {stats[stat] >= 0 && "+"}
                  {stats[stat]}
                </ListItemText>
              </ListItemButton>
              <ButtonGroup orientation="vertical" size="small">
                <Button onClick={() => handleIncrement(stat)}>
                  <ArrowDropUpIcon />
                </Button>
                <Button onClick={() => handleDecrement(stat)}>
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
            </ListItem>
          ))}
        </List>
      </>
    )
  );
}
