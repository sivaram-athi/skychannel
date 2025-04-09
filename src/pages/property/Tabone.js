import * as React from "react";
import { Paper } from "@mui/material";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TablePagination } from "@mui/material";
import { TableRow } from "@mui/material";
// import { Checkbox } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import AddChannels from "./AddChannels";
import axios from "axios";
import { useEffect } from "react";
import EditChannel from "./EditChannel";

const aStyle = {
  color: "#106388",
  cursor:"pointer",
};

export default function StickyHeadTable({ setProperty, setPropertyName }) {
  // console.log(setProperty);
  const [page, setPage] = useState(0);
  const [channel, setChannel] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState(0);
  const [id, setId] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://beedesk.skyhms.in/skychnl/getChannelData"
      );
      // setData(response.data);
      const roomRows = response.data.map((e) => ({
        id: e.propotatrnid,
        name: e.hotelcode,
        status: e.status,
        ota : e.otaname,
      }));
      setRows(roomRows);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleRoomAddition = () => {
    fetchData(); // Re-fetch the data after adding the room
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      {channel === 0 && edit === 0 && (
        <div>
          <div
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 2px 0px 0px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h3 style={{ margin: "5px" }}>CHANNEL CONFIGURATION</h3>
            <p style={{ fontSize: "large", margin: "5px" }}>
              Total Channels Assigned:{rows.length}
            </p>
          </div>
          <Button
            variant="contained"
            style={{
              height: "30px",
              margin: "10px",
              backgroundColor: "#5DB996",
              float: "right",
            }}
            onClick={() => {
              setChannel(1);
            }}
          >
            Add Channels
          </Button>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableBody>
                  {(rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.ota}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        {row.status === "1" ? (
                          <p style={{ color: "green" }}>Active</p>
                        ) : (
                          <p style={{ color: "red" }}>InActive</p>
                        )}
                      </TableCell>
                      <TableCell>
                        {
                          <a style={aStyle} onClick={()=>{
                            setEdit(1)
                            setId(row.id)
                          }}>
                            Edit
                          </a>
                        }
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          <SyncIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      )}
      {channel !== 0 && (
        <AddChannels setChannel={setChannel} onRoomAdded={handleRoomAddition} />
      )}
      {
        edit !== 0 && (
          <EditChannel id={id} setEdit={setEdit} onRoomAdded={handleRoomAddition} />
        )
      }
    </>
  );
}
