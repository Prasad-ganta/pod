// src/TShirt.jsx
import React from "react";
import { useGLTF } from "@react-three/drei";

export default function TShirt(props) {
  const { scene } = useGLTF("/tshirt.glb"); // Make sure to place tshirt.glb in public/
  return <primitive object={scene} {...props} />;
}