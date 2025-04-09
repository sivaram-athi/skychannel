import React from "react"
import { Card, CardContent, Typography } from "@mui/material"

const RoomTypeCard = ({ name, color, value }) => {
  return (
    <Card className="room-type-card" style={{ borderLeft: `8px solid ${color}` }}>
      <CardContent style={{padding: "0px 15px"}}>
        <Typography variant="h6" component="div" style={{lineHeight: "1"}}>
          {name}
        </Typography>
        <Typography variant="h4" component="div" style={{lineHeight: "1"}}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default RoomTypeCard

