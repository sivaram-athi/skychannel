import * as React from "react";
import { Paper } from "@mui/material";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TablePagination } from "@mui/material";
import { TableRow } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const columns = [
  { id: "id", label: "ID", minWidth: 10 },
  { id: "name", label: "Hotel Name", minWidth: 170 },
  { id: "Location", label: "Location", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 70 },
  { id: "action", label: "Action", minWidth: 170, align: "center" },
];

const aStyle = {
  color: "#106388",
};

// Function to get color based on status
const getStatusColor = (status) => {
  if (status === "Active") {
    return "green";
  } else if (status === "Disable") {
    return "red";
  }
  return "black"; // Default color
};

function createData(id, name, Location, status, action) {
  return { id, name, Location, status, action };
}

export default function StickyHeadTable({ setProperty, setPropertyName }) {
  // const rows = [
  //     createData(1, 'Canyon Sun hotel', 'India', "Active", (
  //         <>
  //             <a style={aStyle} href="#" onClick={() => getvalue(1, 'Canyon Sun hotel')} key="manage-property">Manage Property</a>
  //         </>
  //     )),
  //     createData(2, 'Ram', 'India', "Disable", (
  //         <>
  //             <a style={aStyle} href="#" onClick={() => getvalue(2, 'Ram')} key="manage-property">Manage Property</a>
  //         </>
  //     )),
  // ];

  const [rows, setRows] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://beedesk.skyhms.in/skychnl/get_property_list")
      .then((response) => {
        // console.log(response.data);
        const rowData = response.data.map((e) => ({
          id: e.propid,
          name: e.propname,
          location: e.propadd1,
        }));
        setRows(rowData);
        // console.log(rows);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getvalue = (id, Name) => {
    setProperty(id);
    setPropertyName(Name);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#638faf",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {/* {columns.map((column) => {
                                            const value = row[column.id];
                                            return ( */}
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell style={{color:getStatusColor("Active")}}>Active</TableCell>
                    <TableCell align="center">
                      <a
                        style={aStyle}
                        href="#"
                        onClick={() => getvalue(row.id, row.name)}
                        key="manage-property"
                      >
                        Manage Property
                      </a>
                    </TableCell>
                    {/* );
                                        })} */}
                  </TableRow>
                );
              })}
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
  );
}
