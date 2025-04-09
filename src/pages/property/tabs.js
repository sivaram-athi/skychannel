import * as React from "react";
import {Box} from "@mui/material";
import {Tab} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tabone from "./Tabone";
import Tabtwo from "./Tabtwo";
// import Tabthree from "./Tabthree";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="Dark"
            aria-label="lab API tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="CHANNELS" value="1" sx={{ fontWeight: "bold" }} />
            <Tab label="ROOM / RATES MAPPING" value="2" sx={{ fontWeight: "bold" }} />
            {/* <Tab
              label="ROOM / RATE MAPPING"
              value="3"
              sx={{ fontWeight: "bold" }}
            /> */}
            {/* <Tab label="BOOKING SOURCE" value="4" sx={{ fontWeight: "bold" }} /> */}
          </TabList>
        </Box>
        <TabPanel style={{ padding: "0", }} value="1">
          <Tabone />
        </TabPanel>
        <TabPanel style={{ padding: "0", }} value="2">
          <Tabtwo  />
        </TabPanel>
        {/* <TabPanel style={{ padding: "0", }} value="3">
          <Tabthree />
        </TabPanel> */}
        {/* <TabPanel value="4">Item Three</TabPanel> */}
      </TabContext>
    </Box>
  );
}
