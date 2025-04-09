import React, { useState } from 'react';
import { 
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 1200,
  margin: '20px auto',
  padding: theme.spacing(3),
  
  '& .header': {
    marginBottom: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
  },
  
  '& .content-wrapper': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(3),
    
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  '& .MuiAccordionSummary-content': {
    margin: `${theme.spacing(1)} 0`,
  },
  '&.Mui-expanded': {
    margin: theme.spacing(1, 0),
  },
  '& .mapped-status': {
    color: theme.palette.success.main,
    fontSize: '0.875rem',
    marginLeft: theme.spacing(2),
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  animation: 'ripple 0.6s linear',
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(0.95)',
    },
    '50%': {
      transform: 'scale(1.05)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));

const RoomMapping = () => {
  const [selectedRoom, setSelectedRoom] = useState('Canyon King');
  
  const channels = [
    'GOIBIBO', 
    'Expedia', 
    'Cleartrip Flipkart', 
    'EaseMyTrip', 
    'Booking.com', 
    'Agoda'
  ];
  
  const offlineRooms = [
    { name: 'Platinum Room', mapped: true },
    { name: 'Platinum Deluxe Room', mapped: true },
    { name: 'Canyon King', mapped: false }
  ];

  return (
    <StyledPaper elevation={3}>
      {/* <Box className="header">
        <Typography variant="h5">Map Rooms</Typography>
      </Box> */}
      
      <Box className="content-wrapper">
        <Box>
          <Typography variant="h6" gutterBottom>
            CHANNELS
          </Typography>
          {channels.map((channel) => (
            <StyledAccordion key={channel}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{channel}</Typography>
                <Typography className="mapped-status">
                  Room(s) Already Mapped
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="textSecondary">
                  Mapped room details would appear here
                </Typography>
              </AccordionDetails>
            </StyledAccordion>
          ))}
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            OFFLINE ROOMS
          </Typography>
          <RadioGroup
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            {offlineRooms.map((room) => (
              <FormControlLabel
                key={room.name}
                value={room.name}
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {room.name}
                    {room.mapped && (
                      <CheckCircleIcon 
                        color="success" 
                        sx={{ ml: 1, fontSize: 20 }} 
                      />
                    )}
                  </Box>
                }
              />
            ))}
          </RadioGroup>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <ActionButton
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
            >
              Add
            </ActionButton>
            <ActionButton
              variant="contained"
              color="error"
              startIcon={<RemoveIcon />}
            >
              Remove
            </ActionButton>
          </Box>
        </Box>
      </Box>
      
      {/* <Box sx={{ 
        mt: 3, 
        display: 'flex', 
        justifyContent: 'flex-end',
        borderTop: '1px solid #ddd',
        pt: 2 
      }}>
        <Button variant="outlined" sx={{ mr: 1 }}>
          Close
        </Button>
        <Button variant="contained" color="primary">
          Assign
        </Button>
      </Box> */}
    </StyledPaper>
  );
};

export default RoomMapping;