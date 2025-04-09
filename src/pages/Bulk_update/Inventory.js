import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

// const demoTheme = extendTheme({
//   colorSchemes: { light: true, dark: true },
//   colorSchemeSelector: "class",
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

export default function Inventory({ setForm }) {
  return (
    <>
      <div
        className="headerDiv"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <h3>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Bulk Update
            </Link>
            <Typography
              sx={{ color: "text.primary" }}
              style={{ fontSize: "x-large" }}
            >
              Multiple Rate
            </Typography>
          </Breadcrumbs>
        </h3>
        {/* <Button
          className="priority"
          variant="contained"
          style={{
            height: "30px",
            marginTop: "20px",
            backgroundColor: "#5DB996",
          }}
        >
          Excel Inventory Update
        </Button> */}
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid xs={12} sm={3}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Property:
            </Typography>
          </Grid>
          <Grid size={4} style={{ marginLeft: "3%" }}>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              style={{ width: "100%" }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">
                Canyon Sun Hotel
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value=""
                label="Canyon Sun Hotel"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid xs={12} sm={3}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Rooms:
            </Typography>
          </Grid>
          <Grid size={4} style={{ marginLeft: "4%" }}>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              style={{ width: "100%" }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Canyon King</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={selectedValue}  // Controlled value
                // onChange={handleChange}  // Handle the change
                label="Canyon King"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          alignItems="center"
          style={{ marginTop: "10px" }}
        >
          {/* Label for Rate Validity */}
          <Grid item xs={12} sm={3} md={2}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Date Range:
            </Typography>
          </Grid>

          {/* Date Range Picker */}
          <Grid item style={{ marginLeft: "1.7%" }} xs={12} sm={9} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateRangePicker"]}>
                <DateRangePicker
                  slotProps={{ textField: { size: "small" } }}
                  localeText={{ start: "From", end: "To" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          alignItems="center"
          style={{ marginTop: "10px" }}
        >
          <Grid item xs={12} sm={3} md={2}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Selected Days:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9} md={10}>
            <Grid container spacing={1}>
              {["Weekend", "Weekdays", "All Days"].map((day) => (
                <Grid item xs={6} sm={4} md={2} key={day}>
                  <FormControlLabel control={<Checkbox />} label={day} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          alignItems="center"
          style={{ marginTop: "10px" }}
        >
          <Grid item xs={12} sm={3} md={2}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Parameters:
            </Typography>
          </Grid>
          <Grid style={{ marginLeft: "1.8%" }} item xs={12} sm={9} md={10}>
            <Grid container spacing={1}>
              {["Cut Off", "Stop Cell", "COA", "COD", "All"].map((day) => (
                <Grid item xs={6} sm={4} md={2} key={day}>
                  <FormControlLabel control={<Checkbox />} label={day} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          alignItems="center"
          style={{ marginTop: "20px", marginLeft: "11%" }}
        >
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={() => { setForm(0) }} color="primary" sx={{ width: "100%" }}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
