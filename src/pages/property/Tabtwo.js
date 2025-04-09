import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Tabtwotable from "./Tabtwotable";
import Button from "@mui/material/Button";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import AddRatePlan from "./AddRatePlan";
import AddRoom from "./AddRoom";
// import { useState, useEffect } from "react";
import axios from "axios";
// import $ from "jquery";
import EditRoom from "./EditRoom";
import Swal from "sweetalert2";
import Edit_ratePlan from "./Edit_ratePlan";
import AddRoomChannel from "./AddRoomChannel";

function Row(props) {
  const { row } = props;
  const { setEditRateId } = row;
  const { setEditRate } = row;
  const { setPlanDel } = row;
  const { setEditId } = row;
  // const { setChannel } = row;
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
        <TableCell component="td" style={{ width: "56%" }} scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right" style={{ width: "9%" }}>
          <Button
            variant="contained"
            onClick={() => {
              row.setPlan(1);
              row.setEditId(row.id);
            }}
            style={{
              backgroundColor: "#42576B",
              color: "#FFF",
              padding: "2px 6px",
              fontSize : "12px"
            }}
            size="small"
          >
            Rate Plans
          </Button>
        </TableCell>
        <TableCell align="right" style={{ width: "9%" }}>
          <Button
            variant="contained"
            onClick={() => {
              row.setChannel(1);
              row.setEditId(row.id);
            }}
            style={{
              backgroundColor: "#42576B",
              color: "#FFF",
              padding: "2px 6px",
              fontSize : "12px"
            }}
            size="small"
          >
            Channels
          </Button>
        </TableCell>
        <TableCell align="right" style={{ width: "7%" }}>
          <Button
            style={{
              backgroundColor: "#1565c0",
              color: "#FFF",
              padding: "2px 0px",
            }}
            onClick={() => {
              row.setEdit(1);
              row.setEditId(row.id);
            }}
          >
            {<EditTwoToneIcon />}
          </Button>
        </TableCell>
        <TableCell align="right" style={{ width: "7%" }}>
          <Button
            style={{
              backgroundColor: "#e55361",
              color: "#FFF",
              padding: "2px 0px",
            }}
            onClick={() => {
              row.setDel(row.id);
            }}
          >
            {<DeleteForeverRoundedIcon />}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Tabtwotable id = {row.id} setEditRateId={setEditRateId} setEditRate={setEditRate} setPlanDel={setPlanDel} setEditId={setEditId} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [plan, setPlan] = useState(0);
  const [edit, setEdit] = useState(0);
  const [editRate, setEditRate] = useState(0);
  const [editRateId, setEditRateId] = useState(0);
  const [room, setRoom] = useState(0);
  // const [data, setData] = useState(null);
  const [rows, setRows] = useState([]);
  const [editId, setEditId] = useState(null);
  const [del, setDel] = useState(null);
  const [planDel, setPlanDel] = useState(null);
  const [channel, setChannel] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.post("https://beedesk.skyhms.in/skychnl/getRoomData");
      // setData(response.data);
      const roomRows = response.data.map((e) => ({
        id: e.roomtypeid,
        name: e.roomtypename,
      }));
      setRows(roomRows);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    if (del != null) {
      // Send delete request
      axios({
        url: "https://beedesk.skyhms.in/skychnl/deleteroom",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          id: del,
        },
      })
        .then((res) => {
          if (res.data.success) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Room deleted successfully!",
              timer: 2000,
              showConfirmButton: false,
            });
            fetchData(); // Re-fetch the data after deletion
          }
        })
        .catch((err) => {
          console.error("Error deleting room", err);
        });
    }
  }, [del]);

  useEffect(() => {
    if (planDel != null) {
      axios({
        url: "https://beedesk.skyhms.in/skychnl/deleterateplan",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          id: planDel,
        },
      })
        .then((res) => {
          if (res.data.success) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Room deleted successfully!",
              timer: 2000,
              showConfirmButton: false,
            });
            fetchData();
          }
        })
        .catch((err) => {
          console.error("Error deleting room", err);
        });
    }
  }, [planDel]);

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs on component mount

  const handleRoomAddition = () => {
    fetchData(); // Re-fetch the data after adding the room
  };
  // console.log(editId);
  return (
    <>
      {plan === 0 && room === 0 && edit === 0 && editRate === 0 && channel === 0 && (
        <div>
          <div
            className="tabone"
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 2px 0px 0px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h3>ROOM / RATE CONFIGURATION</h3>
            <div
              style={{
                display: "flex",
                width: "32%",
                justifyContent: "right",
              }}
              className="save"
            >
              {/* <Button
                variant="contained"
                style={{
                  height: "30px",
                  marginTop: "10px",
                  backgroundColor: "#5DB996",
                }}
              >
                Room Priority
              </Button> */}
              <Button
                variant="contained"
                onClick={() => {
                  setRoom(1);
                }}
                style={{
                  height: "30px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#5DB996",
                }}
              >
                Add Room
              </Button>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableBody>
                {rows.map((row) => (
                  <Row
                    key={row.name}
                    row={{ ...row, setPlan, setEdit, setEditId, setDel,setEditRateId, setEditRate, setPlanDel, setChannel }}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {plan !== 0 && <AddRatePlan setPlan={setPlan} id={editId} onRoomAdded={handleRoomAddition} />}
      {channel !== 0 && <AddRoomChannel setChannel={setChannel} id={editId} onRoomAdded={handleRoomAddition} />}
      {room !== 0 && (
        <AddRoom setRoom={setRoom} onRoomAdded={handleRoomAddition} />
      )}
      {edit !== 0 && (
        <EditRoom
          setEdit={setEdit}
          onRoomAdded={handleRoomAddition}
          id={editId}
        />
      )}
      {editRate !== 0 && (
        <Edit_ratePlan
          setEditRate={setEditRate}
          onRoomAdded={handleRoomAddition}
          editRateId={editRateId}
          id={editId}
        />
      )}
    </>
  );
}
