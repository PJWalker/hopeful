import { FearMaterial } from "./fear/FearMaterial";
import { HopeMaterial } from "./hope/HopeMaterial";
import { NeutralMaterial } from "./neutral/NeutralMaterial";
import { DiceType } from "../types/DiceType";

export function DiceMaterial({ diceType }: { diceType: DiceType }) {
  switch (diceType) {
    case "FEAR":
    case "DISADVANTAGE":
      return <FearMaterial />;
    case "HOPE":
    case "ADVANTAGE":
      return <HopeMaterial />;
    default:
      return <NeutralMaterial />;
  }
}
