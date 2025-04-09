import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useEffect, useState } from "react";
import axios from "axios";

const columns = [
  { id: "Rate_plan", label: "Rate Plan", align: "center" },
  { id: "Meal_plan", label: "Meal Plan", align: "center" },
  { id: "Status", label: "Status", align: "center" },
  // { id: "Base", label: "Base Rate", align: "center" },
  // { id: "Min", label: "Min Rate", align: "center" },
  // { id: "Max", label: "Max Rate", align: "center" },
  { id: "action2", label: "Action", align: "center" },
];
const aStyle = {
  color: "#106388",
  cursor: "pointer",
};

export default function StickyHeadTable({
  id,
  setEditRateId,
  setEditRate,
  setPlanDel,
  setEditId
}) {
  // console.log(id);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios({
      url: "https://beedesk.skyhms.in/skychnl/getRatePlan",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        id: id,
      },
    })
      .then((res) => {
        const data = res.data.map((e) => ({
          // Base: e.baserate,
          // Min: e.minrate,
          // Max: e.maxrate,
          rateplanid: e.rateplanid,
          Meal_plan: e.mealplan,
          Rate_plan: e.scplanname,
          status: e.status,
        }));
        setRows(data);
      })
      .catch((err) => {});
  }, [id]);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "70vh", overflowX: "auto" }}>
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
                    color: "#FFF",
                    fontSize: "12px",
                    padding: "4px 12px",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.Rate_plan}>
                <TableCell
                  style={{ fontSize: "12px", padding: "12px" }}
                  align="center"
                >
                  {row.Rate_plan}
                </TableCell>
                <TableCell
                  style={{ fontSize: "12px", padding: "12px" }}
                  align="center"
                >
                  {row.Meal_plan}
                </TableCell>
                <TableCell
                  style={{ fontSize: "12px", padding: "12px" }}
                  align="center"
                >
                  {row.status === "1" ? (
                    <p style={{ color: "green" }}>Active</p>
                  ) : (
                    <p style={{ color: "red" }}>InActive</p>
                  )}
                </TableCell>
                <TableCell
                  style={{ fontSize: "12px", padding: "12px" }}
                  align="center"
                >
                  {
                    <a
                      onClick={() => {
                        setEditRateId(row.rateplanid);
                        setEditRate(row.rateplanid);
                        setEditId(id);
                      }}
                      style={aStyle}
                    >
                      <EditTwoToneIcon />
                    </a>
                  }{" "}
                  |{" "}
                  {
                    <a
                      onClick={() => {
                        setPlanDel(row.rateplanid);
                        setRows((prevRows) => prevRows.filter((r) => r.rateplanid !== row.rateplanid)); // Remove the row from the table
                      }}
                      style={aStyle}
                    >
                      <DeleteForeverRoundedIcon />
                    </a>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
