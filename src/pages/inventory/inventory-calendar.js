"use client"

import { useState } from "react"
import { Box, Checkbox, Paper, Typography, IconButton, Button, FormControlLabel, Grid } from "@mui/material"
import { ChevronLeft, ChevronRight, Search, Close } from "@mui/icons-material"

const platforms = [
  {
    name: "Agoda",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4XqiUURstJj5qVqYPF8Jc5ddxFLZKd.png",
  },
  {
    name: "Booking.com",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4XqiUURstJj5qVqYPF8Jc5ddxFLZKd.png",
  },
  {
    name: "EaseMyTrip",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4XqiUURstJj5qVqYPF8Jc5ddxFLZKd.png",
  },
  {
    name: "Expedia",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4XqiUURstJj5qVqYPF8Jc5ddxFLZKd.png",
  },
  {
    name: "Cleartrip",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4XqiUURstJj5qVqYPF8Jc5ddxFLZKd.png",
  },
  {
    name: "Goibibo",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4XqiUURstJj5qVqYPF8Jc5ddxFLZKd.png",
  },
]

export default function InventoryCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 11))
  const [selectedCells, setSelectedCells] = useState({})

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = new Date(year, month + 1, 0).getDate()
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1))
  }

  const handleCellClick = (platform, date) => {
    const key = `${platform}-${date}`
    setSelectedCells((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleMonthChange = (increment) => {
    setSelectedDate((prev) => new Date(prev.setMonth(prev.getMonth() + increment)))
  }

  return (
    <Paper sx={{ p: 3, maxWidth: "100%", overflowX: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, alignItems: "center" }}>
        <Typography variant="h5" component="h1" sx={{ color: "#4a90e2" }}>
          CANYON KING
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* <IconButton size="small">
            <Search />
          </IconButton> */}
          <Button variant="contained" color="success" size="small">
            Save
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: "center" }}>
        <Typography variant="h6">
          {selectedDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </Typography>
        <Box>
          <IconButton onClick={() => handleMonthChange(-1)}>
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={() => handleMonthChange(1)}>
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1, overflowX: "auto" }}>
        <Box sx={{ minWidth: 150 }}>
          <Box sx={{ height: 50 }} /> {/* Header spacing */}
          {platforms.map((platform) => (
            <Box
              key={platform.name}
              sx={{
                height: 50,
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #eee",
              }}
            >
              <FormControlLabel control={<Checkbox size="small" />} label={platform.name} sx={{ ml: 0 }} />
            </Box>
          ))}
        </Box>

        <Box sx={{ overflow: "auto" }}>
          <Grid container sx={{ minWidth: "max-content" }}>
            {/* Calendar header */}
            {getDaysInMonth(selectedDate).map((date) => (
              <Grid
                item
                key={date.getTime()}
                sx={{
                  width: 50,
                  textAlign: "center",
                  borderRight: "1px solid #eee",
                  borderBottom: "1px solid #eee",
                  p: 1,
                }}
              >
                <Typography variant="caption" display="block">
                  {date.getDate()}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {date.toLocaleString("default", { weekday: "short" })}
                </Typography>
              </Grid>
            ))}

            {/* Calendar cells */}
            {platforms.map((platform) => (
              <Grid container key={platform.name} sx={{ borderBottom: "1px solid #eee" }}>
                {getDaysInMonth(selectedDate).map((date) => {
                  console.log(selectedDate);
                  const key = `${platform.name}-${date.getTime()}`
                  return (
                    <Grid
                      item
                      key={key}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRight: "1px solid #eee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // border: "1px solid orange",
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.04)",
                        },
                      }}
                      onClick={() => handleCellClick(platform.name, date.getTime())}
                      style={{border:"2px solid orange",borderRadius:"10px"}}
                    >
                      {selectedCells[key] && <Close fontSize="large" style={{border:"2px solid orange",borderRadius:"10px",color:"orange",background:"gainsboro"}} />}
                    </Grid>
                  )
                })}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Paper>
  )
}

