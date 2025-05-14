"use client"

import { useState, useRef } from "react"
import "./ImageUploader.css"

const ImageUploader = ({ selectedImage, onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  // Default placeholder image
  const placeholderImage = "/placeholder.svg?height=300&width=300"

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    if (!file.type.match("image.*")) {
      alert("Please select an image file")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        onImageSelect(e.target.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    onImageSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="image-uploader">
      <div
        className={`upload-area ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {selectedImage ? (
          <div className="selected-image-container">
            <img src={selectedImage || "/placeholder.svg"} alt="Selected design" className="selected-image" />
            <button type="button" className="remove-image-btn" onClick={handleRemove}>
              ✕
            </button>
          </div>
        ) : (
          <>
            <div className="upload-icon">
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <p>Drop an image here or click to upload</p>
          </>
        )}
        <input type="file" ref={fileInputRef} onChange={handleFileInput} accept="image/*" className="file-input" />
      </div>

      {selectedImage && (
        <div className="preview-thumbnail">
          <p>Design Preview:</p>
          <img src={selectedImage || "/placeholder.svg"} alt="Design preview" className="thumbnail" />
        </div>
      )}
    </div>
  )
}

export default ImageUploader
