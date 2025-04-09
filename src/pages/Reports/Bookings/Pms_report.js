import * as React from "react";
import {Paper} from "@mui/material";
import {Table} from "@mui/material";
import {TableBody} from "@mui/material";
import {TableCell} from "@mui/material";
import {TableContainer} from "@mui/material";
import {TableHead} from "@mui/material";
import {TablePagination} from "@mui/material";
import {TableRow} from "@mui/material";
import {Checkbox} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const columns = [
  { id: "details", label: "Booking Details", minWidth: 170 },
  { id: "Property", label: "Property", minWidth: 170 },
  { id: "guest_detail", label: "Guest Details", minWidth: 70 },
  { id: "date", label: "Date", minWidth: 170 },
  { id: "PMS_name", label: "PMS Name", minWidth: 70 },
  { id: "request_response", label: "PMS Request/Response", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 100 },
];

const rows = [
  {
    id: 1,
    details: "Cupcake",
    Property: "Canyon Sun Hotel",
    guest_detail: "FAIZAL ABDUL KADER",
    date: "Booking Date: 2021-09-30 12:00:00 AM",
    checkin: "Checkin Date: 10 Jan, 2025 (2 nts)",
    PMS_name: "SkyHms",
    status: "Active",
  },
  {
    id: 2,
    details: "Donut",
    Property: "Canyon Sun Hotel",
    guest_detail: "SURANJAN DAS",
    date: "Booking Date: 2021-09-30 12:00:00 AM",
    checkin: "Checkin Date: 10 Jan, 2025 (2 nts)",
    PMS_name: "SkyHms",
    status: "Active",
  },
];

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 14,
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#638FAF",
          color: "#FFF",
          fontWeight: "bold",
        },
        body: {
          fontSize: 14,
          color: "#212121",
        },
      },
    },
  },
});

const Pms_report = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)", borderRadius: "8px" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <TableRow key={row.details} hover>
                  <TableCell>{row.details}</TableCell>
                  <TableCell>{row.Property}</TableCell>
                  <TableCell>
                    {row.guest_detail} <br /> (1A | 1 Room)
                  </TableCell>
                  <TableCell>
                    {row.date} <br /> {row.checkin}
                  </TableCell>
                  <TableCell>{row.PMS_name}</TableCell>
                  <TableCell>
                    <a href="#" style={{ color: "#1976D2", textDecoration: "none" }}>Request | Response</a>
                  </TableCell>
                  <TableCell>
                    <Checkbox {...label} sx={{ color: "#1976D2" }} /> Success
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
          sx={{
            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
              fontSize: "0.875rem",
            },
          }}
        />
      </Paper>
    </ThemeProvider>
  );
};

export default Pms_report;
