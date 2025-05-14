"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import TShirtModel from "./components/TShirtModel"
import CustomizationForm from "./components/CustomizationForm"
import ImageUploader from "./components/ImageUploader"
import TextEditor from "./components/TextEditor"
import ThemeSelector from "./components/ThemeSelector"
import "./App.css"

function App() {
  const [showModel, setShowModel] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [theme, setTheme] = useState("default")

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      height: 180,
      weight: 80,
      build: "athletic",
      text: "",
    },
  })

  const formValues = watch()

  // Handle Alt+Q to toggle between 2D and 3D views
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === "q") {
        setShowModel((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const onSubmit = (data) => {
    console.log("Form submitted:", data)
    // In a real app, this would send the data to a backend
  }

  return (
    <div className={`app-container theme-${theme}`}>
      <div className="background-animation"></div>

      <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />

      <div className="customizer-container">
        <div className="left-panel">
          <h1 className="glow-text">T-Shirt Customizer</h1>
          <p className="instructions">
            Customize your perfect t-shirt below. Press <kbd>Alt</kbd> + <kbd>Q</kbd> to toggle between 2D and 3D views.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomizationForm control={control} />

            <div className="image-upload-section">
              <h2 className="section-title">Upload Design</h2>
              <ImageUploader selectedImage={selectedImage} onImageSelect={setSelectedImage} />
            </div>

            <TextEditor control={control} />

            <button type="submit" className="submit-button">
              <span className="button-text">Add to Cart</span>
              <span className="button-shine"></span>
            </button>
          </form>
        </div>

        <div className="right-panel">
          {showModel ? (
            <div className="model-container">
              <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight
                  position={[5, 5, 5]}
                  intensity={1}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
                <TShirtModel image={selectedImage} text={formValues.text} build={formValues.build} />
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                <gridHelper args={[10, 10, `#05d9e8`, `#333333`]} position={[0, -1.5, 0]} />
                <fog attach="fog" args={["#01012b", 3, 10]} />
              </Canvas>
              <button className="view-toggle-button" onClick={() => setShowModel(false)}>
                Switch to 2D View
              </button>
            </div>
          ) : (
            <div className="preview-container">
              <div className="tshirt-preview">
                <div className="tshirt-image">
                  {selectedImage && (
                    <div className="design-overlay">
                      <img src={selectedImage || "/placeholder.svg"} alt="T-shirt design" />
                    </div>
                  )}
                  {formValues.text && (
                    <div className="text-overlay">
                      {formValues.text.split("\n").map((line, i) => (
                        <div key={i} className="text-line">
                          {line}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="tshirt-details">
                  <p>Height: {formValues.height} cm</p>
                  <p>Weight: {formValues.weight} kg</p>
                  <p>Build: {formValues.build}</p>
                </div>
              </div>
              <button className="view-toggle-button" onClick={() => setShowModel(true)}>
                Switch to 3D View
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
