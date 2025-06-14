import { Die } from "./Die";

export interface DiceSet {
  id: string;
  name: string;
  dice: Die[];
}
