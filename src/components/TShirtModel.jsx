"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { TextureLoader } from "three"

const TShirtModel = ({ image, build }) => {
  const meshRef = useRef(null)
  const textureRef = useRef(null)

  // Create a texture from the uploaded image if available
  useEffect(() => {
    if (image && meshRef.current) {
      const loader = new TextureLoader()
      textureRef.current = loader.load(image)
    }
  }, [image])

  // Adjust the model based on the selected build
  useEffect(() => {
    if (meshRef.current) {
      switch (build) {
        case "lean":
          meshRef.current.scale.set(0.9, 1, 0.9)
          break
        case "reg":
          meshRef.current.scale.set(1, 1, 1)
          break
        case "athletic":
          meshRef.current.scale.set(1.1, 1, 1)
          break
        case "big":
          meshRef.current.scale.set(1.2, 1.1, 1.1)
          break
        default:
          meshRef.current.scale.set(1, 1, 1)
      }
    }
  }, [build])

  // Animate the t-shirt
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <boxGeometry args={[1, 1.5, 0.5]} />
      <meshStandardMaterial color="#ffffff" map={textureRef.current} />
    </mesh>
  )
}

export default TShirtModel
