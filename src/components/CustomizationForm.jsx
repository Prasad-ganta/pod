"use client"

import { Controller } from "react-hook-form"
import "./CustomizationForm.css"

const CustomizationForm = ({ control }) => {
  return (
    <div className="customization-form">
      <h2 className="section-title">Body Measurements</h2>
      <div className="measurements-box">
        <div className="measurement-item">
          <label htmlFor="height">Height (cm)</label>
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <div className="scroll-input">
                <input
                  type="number"
                  id="height"
                  min={140}
                  max={220}
                  {...field}
                  onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                />
                <div className="scroll-controls">
                  <button
                    type="button"
                    onClick={() => field.onChange(Math.min(220, field.value + 1))}
                    className="scroll-up"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange(Math.max(140, field.value - 1))}
                    className="scroll-down"
                  >
                    ▼
                  </button>
                </div>
              </div>
            )}
          />
        </div>

        <div className="measurement-item">
          <label htmlFor="weight">Weight (kg)</label>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <div className="scroll-input">
                <input
                  type="number"
                  id="weight"
                  min={40}
                  max={150}
                  {...field}
                  onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                />
                <div className="scroll-controls">
                  <button
                    type="button"
                    onClick={() => field.onChange(Math.min(150, field.value + 1))}
                    className="scroll-up"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange(Math.max(40, field.value - 1))}
                    className="scroll-down"
                  >
                    ▼
                  </button>
                </div>
              </div>
            )}
          />
        </div>

        <div className="measurement-item">
          <label htmlFor="build">Build</label>
          <Controller
            name="build"
            control={control}
            render={({ field }) => (
              <div className="scroll-input">
                <select id="build" {...field}>
                  <option value="lean">Lean</option>
                  <option value="reg">Regular</option>
                  <option value="athletic">Athletic</option>
                  <option value="big">Big</option>
                </select>
                <div className="scroll-controls">
                  <button
                    type="button"
                    onClick={() => {
                      const options = ["lean", "reg", "athletic", "big"]
                      const currentIndex = options.indexOf(field.value)
                      const nextIndex = (currentIndex + 1) % options.length
                      field.onChange(options[nextIndex])
                    }}
                    className="scroll-up"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const options = ["lean", "reg", "athletic", "big"]
                      const currentIndex = options.indexOf(field.value)
                      const prevIndex = (currentIndex - 1 + options.length) % options.length
                      field.onChange(options[prevIndex])
                    }}
                    className="scroll-down"
                  >
                    ▼
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default CustomizationForm
