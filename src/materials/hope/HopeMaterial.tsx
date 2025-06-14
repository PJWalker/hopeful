import { useTexture } from "@react-three/drei";

import albedo from "./albedo.jpg";
import orm from "./orm.jpg";
import normal from "./normal.jpg";
import emission from "./emission.png";
import { gltfTexture } from "../../helpers/gltfTexture";
import { Color } from "three";

const sheen = new Color(0xFFFF00)

export function HopeMaterial(
  props: JSX.IntrinsicElements["meshPhysicalMaterial"]
) {
  const [albedoMap, ormMap, normalMap] = useTexture(
    [albedo, orm, normal, emission],
    (textures) => gltfTexture(textures, ["SRGB", "LINEAR", "LINEAR", "LINEAR"])
  );
  return (
    <meshPhysicalMaterial
      map={albedoMap}
      aoMap={ormMap}
      roughnessMap={ormMap}
      normalMap={normalMap}
      metalness={0.7}
      roughness={0.8}
      clearcoat={0.7}
      clearcoatRoughness={0.0}
      iridescence={0.5}
      iridescenceIOR={1.2}
      {...props}
    />
  );
}
