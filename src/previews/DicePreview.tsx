import { styled } from "@mui/material/styles";
import { DiceType } from "../types/DiceType";

import D4 from "./D4.png";
import D6 from "./D6.png";
import D8 from "./D8.png";
import D10 from "./D10.png";
import D12 from "./D12.png";
import D20 from "./D20.png";
import D100 from "./D100.png";
import ADVANTAGE from "./ADVANTAGE.png";
import DISADVANTAGE from "./DISADVANTAGE.png";
import HOPE from "./HOPE.png";

const icons: Partial<Record<DiceType, string>> = {
  D4,
  D6,
  D8,
  D10,
  D12,
  D20,
  D100,
  ADVANTAGE,
  DISADVANTAGE,
  HOPE,
};

interface PreviewImageProps {
  size?: "small" | "medium" | "large";
}

const PreviewImage = styled("img", {
  shouldForwardProp: (prop) => prop !== "size",
})<PreviewImageProps>(({ size }) => ({
  width: size === "small" ? "28px" : size === "medium" ? "34px" : "38px",
  height: size === "small" ? "28px" : size === "medium" ? "34px" : "38px",
}));

type DiePreviewProps = {
  diceType: DiceType;
  size?: "small" | "medium" | "large";
};

export function DicePreview({ diceType, size }: DiePreviewProps) {
  return <PreviewImage src={icons[diceType]} alt={`${diceType}`} size={size} />;
}
