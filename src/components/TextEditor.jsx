"use client"

import { Controller } from "react-hook-form"
import "./TextEditor.css"

const TextEditor = ({ control }) => {
  return (
    <div className="text-editor">
      <h2 className="section-title">Add Text to T-Shirt</h2>
      <Controller
        name="text"
        control={control}
        render={({ field }) => (
          <div className="text-input-container">
            <textarea
              {...field}
              placeholder="Enter text to print on your t-shirt (max 3 lines)"
              maxLength={100}
              rows={3}
              className="text-input"
              onChange={(e) => {
                // Limit to 3 lines
                const lines = e.target.value.split("\n")
                if (lines.length <= 3) {
                  field.onChange(e.target.value)
                } else {
                  field.onChange(lines.slice(0, 3).join("\n"))
                }
              }}
            />
            <div className="text-controls">
              <p className="text-limit">{field.value.split("\n").length}/3 lines</p>
              <p className="char-limit">{field.value.length}/100</p>
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default TextEditor
