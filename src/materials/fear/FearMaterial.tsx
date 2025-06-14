import { useTexture } from "@react-three/drei";

import albedo from "./albedo.jpg";
import orm from "./orm.jpg";
import normal from "./normal.jpg";
import { gltfTexture } from "../../helpers/gltfTexture";
import * as THREE from "three";

export function FearMaterial(
  props: JSX.IntrinsicElements["meshPhysicalMaterial"]
) {
  const [albedoMap, ormMap, normalMap] = useTexture(
    [albedo, orm, normal],
    (textures) => gltfTexture(textures, ["SRGB", "LINEAR", "LINEAR"])
  );

  return (
    <meshPhysicalMaterial

      aoMap={albedoMap}
      aoMapIntensity={1.0}
      roughnessMap={ormMap}
      metalnessMap={ormMap}
      metalness={1.0}
      normalMap={normalMap}
      specularColor={0xEE77FF}
      roughness={0.4}
      transmission={0.2}
      thickness={1}
      clearcoat={1.0}
      clearcoatRoughness={0.2}
      side={THREE.DoubleSide}
      envMapIntensity={0.5}
      emissive={0xFFFFFF}
      emissiveIntensity={1.0}
      emissiveMap={albedoMap}
      attenuationColor={0xcc01ee}
      attenuationDistance={0.4}
      ior={1.77}
      specularIntensity={0.5}
      {...props}
    />
  );
}
