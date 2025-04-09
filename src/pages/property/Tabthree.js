import * as React from "react";
import PropTypes from "prop-types";
import { Collapse } from "@mui/material";
import { IconButton } from "@mui/material";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import SliderTab from "./SliderTab";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import RoomMapping from "./RoomMapping";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="td" style={{ width: "55%" }} scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            style={{ backgroundColor: "#42576B", color: "#FFF",padding:"2px 6px",fontSize:"12px" }}
            size="small"
          >
            Extend Rate Validity
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            style={{ backgroundColor: "#42576B", color: "#FFF",padding:"2px 6px",fontSize:"12px" }}
            size="small"
          >
            Map Rate Plans
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, maxWidth: "0vw" }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <SliderTab />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    // calories: PropTypes.number.isRequired,
    // carbs: PropTypes.number.isRequired,
    // fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    // price: PropTypes.number.isRequired,
    // protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  {
    id: 1,
    name: "Canyon King",
    // calories: "0.0%",
    // fat: "Exclusive",
    // carbs: "Sell",
    // protein: "INR",
    Rupees: "INR",
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
    ischeck: "1",
  },
  {
    id: 2,
    name: "Cupcake",
    // calories: "0.0%",
    // fat: "Exclusive",
    // carbs: "Sell",
    // protein: "INR",
    Rupees: "INR",
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
    ischeck: "1",
  },
  {
    id: 3,
    name: "Cupcake",
    // calories: "0.0%",
    // fat: "Exclusive",
    // carbs: "Sell",
    // protein: "INR",
    Rupees: "INR",
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
    ischeck: "1",
  },
];

export default function CollapsibleTable() {
  const [open, setOpen] = useState(false); // State to manage modal

  const handleOpen = () => {
    setOpen(true); // Open modal
  };

  const handleClose = () => {
    setOpen(false); // Close modal
  };
  return (
    <>
      <div
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 2px 0px 0px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3>ROOM / RATE MAPPING</h3>
        <Button
          variant="contained"
          style={{
            height: "30px",
            marginTop: "10px",
            backgroundColor: "#5DB996",
          }}
          onClick={handleOpen}
        >
          Map Rooms
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Map Rooms</DialogTitle>
        <DialogContent>
          <div style={{ height: "500px", padding: "20px" }}>
            <RoomMapping />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
