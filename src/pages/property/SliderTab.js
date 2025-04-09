import * as React from "react";
import {Box} from "@mui/material";
import {Tab} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {Table} from "@mui/material";
import {TableBody} from "@mui/material";
import {TableCell} from "@mui/material";
import {TableContainer} from "@mui/material";
import {TableHead} from "@mui/material";
import {TableRow} from "@mui/material";
import {Paper} from "@mui/material";
import { useRef } from "react";

export default function SliderTab() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const scrollRef = useRef(null);

  return (
    <Box sx={{ maxWidth: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto" }}
        >
          <TabList
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="success"
            aria-label="lab API tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Mapped Rooms" value="1" sx={{ fontWeight: "bold" }} />
            {/* <Tab
              label="Mapped Rate Plan"
              value="2"
              sx={{ fontWeight: "bold" }}
            />
            <Tab
              label="Inactive Mapped Rooms"
              value="3"
              sx={{ fontWeight: "bold" }}
            />
            <Tab
              label="Inactive Mapped Rate Plan"
              value="4"
              sx={{ fontWeight: "bold" }}
            /> */}
          </TabList>
        </Box>
        <TabPanel style={{ padding: "0", marginTop: "20px" }} value="1">
          <div>
            {/* <div
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ margin: 0 }}>MAPPED ROOMS</h3>
            </div> */}
            <Box>
              <Box
                ref={scrollRef}
                sx={{
                  overflowX: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                <TableContainer component={Paper}>
                  <Table
                    sx={{
                      minWidth: 650,
                      borderSpacing: "10px 0",
                      borderCollapse: "separate",
                    }}
                    aria-label="scrollable table"
                  >
                    <TableHead>
                      <TableRow style={{ backgroundColor: "#E3F2FD" }}>
                        <TableCell style={{background:"#638faf",color:"white",borderRadius:"6px"}} align="center">GOIBIBO</TableCell>
                        <TableCell style={{background:"#638faf",color:"white",borderRadius:"6px"}} align="center">Expedia</TableCell>
                        <TableCell style={{background:"#638faf",color:"white",borderRadius:"6px"}} align="center">Cleartrip Flipkart</TableCell>
                        <TableCell style={{background:"#638faf",color:"white",borderRadius:"6px"}} align="center">EaseMy Trip</TableCell>
                        <TableCell style={{background:"#638faf",color:"white",borderRadius:"6px"}} align="center">EaseMy Trip</TableCell>
                        <TableCell style={{background:"#638faf",color:"white",borderRadius:"6px"}} align="center">EaseMy Trip</TableCell>
                        <TableCell style={{background:"#638faf",color:"white",borderRadius:"6px"}} align="center">EaseMy Trip</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          CANYONSUN KING TRIPLE(6216511655651)
                        </TableCell>
                        <TableCell align="center">
                          CANYONSUN KING TRIPLE(6216511655651)
                        </TableCell>
                        <TableCell align="center">
                          CANYONSUN KING TRIPLE(6216511655651)
                        </TableCell>
                        <TableCell align="center">
                          CANYONSUN KING TRIPLE(6216511655651)
                        </TableCell>
                        <TableCell align="center">
                          CANYONSUN KING TRIPLE(6216511655651)
                        </TableCell>
                        <TableCell align="center">
                          CANYONSUN KING TRIPLE(6216511655651)
                        </TableCell>
                        <TableCell align="center">
                          CANYONSUN KING TRIPLE(6216511655651)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </div>
        </TabPanel>
        {/* <TabPanel
          style={{ padding: "0", marginTop: "30px" }}
          value="2"
        ></TabPanel>
        <TabPanel
          style={{ padding: "0", marginTop: "30px" }}
          value="3"
        ></TabPanel>
        <TabPanel
          style={{ padding: "0", marginTop: "30px" }}
          value="4"
        ></TabPanel> */}
      </TabContext>
    </Box>
  );
}
