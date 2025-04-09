import * as React from "react";
import { styled } from "@mui/material/styles";
import {Box} from "@mui/material";
import {Drawer} from "@mui/material";
import {Button} from "@mui/material";
import {TextField} from "@mui/material";
import {Switch} from "@mui/material";
import {FormControlLabel} from "@mui/material";
import { Divider } from "@mui/material";

const Invenetory_manage = () => {
  const [open, setOpen] = React.useState(false);
  const [switchState, setSwitchState] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&::before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&::after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  const DrawerContent = (
    <Box
      className="sideModel"
      sx={{
        width: 405,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
      role="presentation"
      onClick={(event) => event.stopPropagation()} // Prevent accidental closing
    >
      {/* Content Area */}
      <Box>
        <h1
          style={{ marginBottom: "16px", fontSize: "24px", fontWeight: "bold" }}
        >
          Edit Rates
        </h1>
        <Box>
          <h4 style={{ marginBottom: "24px", color: "#555" }}>
            Platinum Room - Ep Plans
          </h4>
          <Box sx={{ marginBottom: 2 }}>
            <label
              htmlFor="input1"
              style={{ display: "block", marginBottom: "8px" }}
            >
              Room Inventory
            </label>
            <TextField
              id="input1"
              variant="outlined"
              fullWidth
              // placeholder="Enter text for Input 1"
            />
          </Box>
          <div>
            <FormControlLabel
              label="Stop Sell"
              control={<Android12Switch defaultChecked />}
            />
          </div>
          <div>
            <FormControlLabel
              label="Close on Arrival"
              control={<Android12Switch defaultChecked />}
            />
          </div>
          <div>
            <FormControlLabel
              label="Close on Departure"
              control={<Android12Switch defaultChecked />}
            />
          </div>
        </Box>
        <Divider />
        <Box>
          <h4 style={{ marginBottom: "24px", color: "#555" }}>
            Platinum Room - Ep Plans
          </h4>
          <Box sx={{ marginBottom: 2 }}>
            <label
              htmlFor="input1"
              style={{ display: "block", marginBottom: "8px" }}
            >
              Room Inventory
            </label>
            <TextField
              id="input1"
              variant="outlined"
              fullWidth
              // placeholder="Enter text for Input 1"
            />
          </Box>
          <div>
            <FormControlLabel
              label="Stop Sell"
              control={<Android12Switch defaultChecked />}
            />
          </div>
          <div>
            <FormControlLabel
              label="Close on Arrival"
              control={<Android12Switch defaultChecked />}
            />
          </div>
          <div>
            <FormControlLabel
              label="Close on Departure"
              control={<Android12Switch defaultChecked />}
            />
          </div>
        </Box>
        <Divider />
        <Box>
          <h4 style={{ marginBottom: "24px", color: "#555" }}>
            Platinum Room - Ep Plans
          </h4>
          <Box sx={{ marginBottom: 2 }}>
            <label
              htmlFor="input1"
              style={{ display: "block", marginBottom: "8px" }}
            >
              Room Inventory
            </label>
            <TextField
              id="input1"
              variant="outlined"
              fullWidth
              // placeholder="Enter text for Input 1"
            />
          </Box>
          <div>
            <FormControlLabel
              label="Stop Sell"
              control={<Android12Switch defaultChecked />}
            />
          </div>
          <div>
            <FormControlLabel
              label="Close on Arrival"
              control={<Android12Switch defaultChecked />}
            />
          </div>
          <div>
            <FormControlLabel
              label="Close on Departure"
              control={<Android12Switch defaultChecked />}
            />
          </div>
        </Box>
        <Divider />
      </Box>

      {/* Button Area */}
      <Box
      sx={{
        position: "sticky",
        bottom: 0,
        background: "#fff", // Match the drawer background
        padding: 2,
        borderTop: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button
        variant="outlined"
        color="success"
        sx={{ width: "45%" }}
        onClick={() => alert("Cancel clicked")}
      >
        Apply And Check
      </Button>
      <Button
        variant="contained"
        color="success"
        sx={{ width: "45%" }}
        onClick={() => alert("Submit clicked")}
      >
        Save
      </Button>
    </Box>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          zIndex: 1300, // Ensure Drawer appears above Navbar
        }}
      >
        {DrawerContent}
      </Drawer>
    </div>
  );
};

export default Invenetory_manage;
