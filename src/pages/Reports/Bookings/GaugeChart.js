import React, { useState, useEffect } from "react"

const GaugeChart = ({ value }) => {
  const [animatedValue, setAnimatedValue] = useState(0)
  const radius = 80
  const circumference = radius * 2 * Math.PI
  const progress = (animatedValue / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, 100)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="gauge-container">
      <svg className="gauge" viewBox="0 0 256 256">
        <circle
          className="gauge-bg"
          strokeWidth="20"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="128"
          cy="128"
        />
        <circle
          className="gauge-fill"
          strokeWidth="20"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="128"
          cy="128"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference - progress,
          }}
        />
      </svg>
      <div className="gauge-value">
        <span>{Math.round(animatedValue)}%</span>
      </div>
    </div>
  )
}

export default GaugeChart

