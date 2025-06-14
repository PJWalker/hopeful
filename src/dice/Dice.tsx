import React from "react";
import { Die } from "../types/Die";
import { DiceMaterial } from "../materials/DiceMaterial";
import { DiceMesh } from "../meshes/DiceMesh";

type DiceProps = JSX.IntrinsicElements["group"] & { die: Die };

export const Dice = React.forwardRef<THREE.Group, DiceProps>(
  ({ die, children, ...props }, ref) => {
    return (
      <DiceMesh diceType={die.type} {...props} ref={ref}>
        <DiceMaterial diceType={die.type} />
        {children}
      </DiceMesh>
    );
  }
);
