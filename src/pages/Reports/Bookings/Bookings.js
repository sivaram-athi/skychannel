import * as React from "react";
import {Box} from "@mui/material";
import {Tab} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import { styled } from "@mui/material/styles";
// import {Paper} from "@mui/material";
import Recent_booking from "./Recent_booking";
import Todays_arrival from "./Todays_arrival";
import Weekly_arrival from "./Weekly_arrival";
// import Pms_report from "./Pms_report";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   ...theme.applyStyles("dark", {
//     backgroundColor: "#1A2027",
//   }),
// }));

export default function Bookings(props) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1",padding: "20px" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            <TabList
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="success"
              aria-label="lab API tabs example"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              sx={{ fontWeight: "bold" }}
            >
              <Tab label="RECENT BOOKINGS" value="1" sx={{ fontWeight: "bold" }} />
              <Tab label="TODAY'S ARRIVAL" value="2" sx={{ fontWeight: "bold" }} />
              {/* <Tab label="TODAY'S DEPARTURE" value="3" sx={{ fontWeight: "bold" }} /> */}
              <Tab label="WEEKLY ARRIVAL" value="4" sx={{ fontWeight: "bold" }} />
              {/* <Tab label="WEEKLY DEPARTURE" value="5" sx={{ fontWeight: "bold" }} /> */}
              {/* <Tab label="PMS REPORT" value="6" sx={{ fontWeight: "bold" }} /> */}
              {/* <Tab label="TENTATIVE REPORT" value="7" sx={{ fontWeight: "bold" }} /> */}
            </TabList>
          </Box>
          <TabPanel style={{ padding: "0", marginTop: "30px" }} value="1">
            <Recent_booking />
          </TabPanel>
          <TabPanel style={{ padding: "0", marginTop: "30px" }} value="2">
            <Todays_arrival />
          </TabPanel>
          {/* <TabPanel style={{ padding: "0", marginTop: "30px" }} value="3"></TabPanel> */}
          <TabPanel style={{ padding: "0" }} value="4">
            <Weekly_arrival />
          </TabPanel>
          {/* <TabPanel style={{ padding: "0", marginTop: "30px" }} value="5"></TabPanel> */}
          {/* <TabPanel style={{ padding: "0", marginTop: "30px" }} value="6">
            <Pms_report />
          </TabPanel> */}
          {/* <TabPanel style={{ padding: "0", marginTop: "30px" }} value="7"></TabPanel> */}
        </TabContext>
      </Box>
    </>
  );
}
