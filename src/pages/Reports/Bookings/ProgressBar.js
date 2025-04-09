import React from "react"
import { Box, Typography, LinearProgress } from "@mui/material"

const ProgressBar = ({ progress, startLabel, endLabel, color }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {startLabel}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {endLabel}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: `${color}33`,
          "& .MuiLinearProgress-bar": {
            borderRadius: 5,
            backgroundColor: color,
          },
        }}
      />
    </Box>
  )
}

export default ProgressBar

