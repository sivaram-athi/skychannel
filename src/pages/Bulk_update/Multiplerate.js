import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
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

// function useDemoRouter(initialPath) {
//     const [pathname, setPathname] = React.useState(initialPath);

//     const router = React.useMemo(() => {
//         return {
//             pathname,
//             searchParams: new URLSearchParams(),
//             navigate: (path) => setPathname(String(path)),
//         };
//     }, [pathname]);

//     return router;
// }

// const Skeleton = styled("div")(({ theme, height }) => ({
//   backgroundColor: theme.palette.action.hover,
//   borderRadius: theme.shape.borderRadius,
//   height,
//   content: '" "',
// }));

export default function Multiplerate({ setForm }) {

  return (
    // <AppProvider
    //     navigation={navigation}
    //     branding={{
    //         title: '',
    //         logo: <img src={Logo}></img>
    //     }}
    //     window={demoWindow}
    //     hideHeader={true}
    // >
    //     <DashboardLayout hideHeader={true}>
    //         <PageContainer>
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
        <Button
          className="priority"
          variant="contained"
          style={{
            height: "30px",
            marginTop: "20px",
            backgroundColor: "#5DB996",
          }}
        >
          Excel Rate Update
        </Button>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid xs={12} sm={3}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Property:
            </Typography>
          </Grid>
          <Grid size={4} style={{ marginLeft: "8%" }}>
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
          <Grid item style={{ marginLeft: "7%" }} xs={12} sm={9} md={6}>
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
              Select Days:
            </Typography>
          </Grid>
          <Grid item style={{ marginLeft: "7%" }} xs={12} sm={9} md={10}>
            <Grid container spacing={1}>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <Grid item xs={6} sm={4} md={2} key={day}>
                  <FormControlLabel control={<Checkbox />} label={day} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid xs={12} sm={3}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Rooms/Rates:
            </Typography>
          </Grid>
          <Grid size={4} style={{ marginLeft: "5.2%" }}>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              style={{ width: "100%" }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">
                Platinum Room
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value=""
                label="Platinum Room"
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
          <Grid item xs={12} sm={3} md={2}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Extra Child / Pay / Stay:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9} md={10}>
            <Grid container spacing={1}>
              {["Extra Child", "Extra Pax", "Min Stay", "Max Stay"].map(
                (day) => (
                  <Grid item xs={6} sm={4} md={2} key={day}>
                    <FormControlLabel control={<Checkbox />} label={day} />
                  </Grid>
                )
              )}
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
              Restriction:
            </Typography>
          </Grid>
          <Grid style={{ marginLeft: "7.6%" }} item xs={12} sm={9} md={10}>
            <Grid container spacing={1}>
              {["Stop Cell", "All"].map((day) => (
                <Grid item xs={6} sm={4} md={2} key={day}>
                  <FormControlLabel control={<Checkbox />} label={day} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid xs={12} sm={3}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Rate Calculator:
            </Typography>
          </Grid>
          <Grid size={4} style={{ marginLeft: "4%" }}>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              style={{ width: "100%" }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">No</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value=""
                label="No"
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
          style={{ marginTop: "20px", marginLeft: "17%" }}
        >
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" sx={{ width: "100%" }}>
              Search
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" onClick={() => { setForm(0) }} color="error" sx={{ width: "100%" }}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
    //         </PageContainer>
    //     </DashboardLayout>
    // </AppProvider>
  );
}
