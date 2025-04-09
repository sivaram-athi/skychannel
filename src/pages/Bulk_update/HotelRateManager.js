import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import {
  Container,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MultipleRate from "./Multiplerate";
import ToggleSwitch from "../inventory/ToggleSwitch";
import Swal from "sweetalert2";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const HotelRateManager = () => {
  const [form, setForm] = useState(0);
  const currentDate = new Date();
  const nextMonthDate = new Date(currentDate);
  nextMonthDate.setMonth(currentDate.getMonth() + 1);
  const [startDate, setStartDate] = useState(
    currentDate.toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    nextMonthDate.toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [rows, setRows] = useState();
  const [planID] = useState("0");
  const [room, setRoom] = useState({});
  const [extraPaxState, setExtraPaxState] = useState({});
  const [extraChildState, setExtraChildState] = useState({});
  const [stopSellState, setStopSellState] = useState({});
  const [stopSellValues, setStopSellValues] = useState({});
  const [inputValues, setInputValues] = useState({});
  const inputRefs = useRef({});
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const activeInputKey = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const inputs = document.querySelectorAll("input[type='number']");
      const currentIndex = Array.from(inputs).indexOf(e.target);
      if (currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      }
    }
  };

  const collectInputValues = () => {
    return inputValues;
  };

  const handleStopSellValueChange = (roomIndex, dayIndex, checked) => {
    setStopSellValues((prev) => ({
      ...prev,
      [`${roomIndex}-${dayIndex}`]: checked ? "1" : "0",
    }));
  };

  const setRowsData = () => {
    var data = [
      {
        id: 1,
        name: "Single",
        values: [],
      },
      {
        id: 2,
        name: "Double",
        values: [],
      },
      {
        id: 3,
        name: "Triple",
        values: [],
      },
      {
        id: "e",
        name: "Extra Pax",
        values: [],
      },
      {
        id: "c",
        name: "Extra Child",
        values: [],
      },
    ];
    setRows(data);
    setLoading(false);
  };

  useEffect(() => {
    setRowsData();
  }, []);

  const fetchRoomData = (id) => {
    $.ajax({
      url: "https://beedesk.skyhms.in/skychnl/getRoomTypePlan",
      type: "POST",
      data: {
        id: id,
      },
      dataType: "json",
      success: function (response) {
        setRoom(response);
        setLoading1(false);
      },
    });
  };

  useEffect(() => {
    fetchRoomData(planID);
  }, []);

  // After any update to inputValues, restore focus to the active input
  useEffect(() => {
    if (activeInputKey.current && inputRefs.current[activeInputKey.current]) {
      inputRefs.current[activeInputKey.current].focus();
    }
  }, [inputValues]);

  function handleStopSellClick(index) {
    setStopSellState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  }

  function handleExtraChildClick(index) {
    setExtraChildState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  }

  function handleExtraPaxClick(index) {
    setExtraPaxState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  }

  const handleInputFocus = (inputKey) => {
    activeInputKey.current = inputKey;
  };

  const handleInputChange = (event, inputKey) => {
    const { value } = event.target;
    activeInputKey.current = inputKey;
    
    setInputValues((prev) => ({
      ...prev,
      [inputKey]: value,
    }));
  };

  function handleSubmit() {
    const allInputValues = collectInputValues();

    const formattedData = room.flatMap((RoomType, roomIndex) =>
      rows
        .map((RowsType) => {
          const dayValues = {};
          days.forEach((day, dayIndex) => {
            const key = `${roomIndex}-${RowsType.id}-${dayIndex}`;
            dayValues[day] = allInputValues[key] || "";
          });

          let stopSellData = {};
          if (stopSellState[roomIndex]) {
            days.forEach((day, dayIndex) => {
              const key = `${roomIndex}-${dayIndex}`;
              stopSellData[day] = stopSellValues[key] || "0";
            });
          }

          return {
            scroomrateplanid: RoomType.rateplanid,
            scroomtypeid: RoomType.roomtypeid,
            mealplan: RoomType.mealplan,
            pax: RowsType.id,
            values: dayValues,
            stopSell: stopSellState[roomIndex] ? stopSellData : null,
          };
        })
        .filter(Boolean)
    );

    console.log("Submitting data:", formattedData);
    // Uncomment the AJAX call when ready to submit
    if (formattedData.length > 0) {
      $.ajax({
        url: "https://beedesk.skyhms.in/skychnl/Store_Bulk_room_update",
        type: "POST",
        data: {
          data: formattedData,
          fromDate: startDate,
          toDate: endDate,
        },
        dataType: "json",
        success: function (response) {
          if (response.success === true) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Data Updated Successfully!",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please add values or make changes first!",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (loading1) {
    return <div>Loading...</div>;
  }

  // Input component to avoid repetition
  const NumberInput = ({ roomIndex, rowType, dayIndex }) => {
    const inputKey = `${roomIndex}-${rowType}-${dayIndex}`;
    
    return (
      <input
        ref={(el) => (inputRefs.current[inputKey] = el)}
        type="number"
        min="0"
        className="Bulk_input"
        style={{
          padding: "8px",
          width: "100%",
          boxSizing: "border-box",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
        value={inputValues[inputKey] || ""}
        onChange={(e) => handleInputChange(e, inputKey)}
        onFocus={() => handleInputFocus(inputKey)}
        onKeyDown={handleKeyPress}
      />
    );
  };

  // Use a regular component instead of React.memo for better performance with refs
  const RateTable = ({ title, RoomIndex }) => (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
        <div className="options" style={{ marginLeft: "17px" }}>
          <label>
            <ToggleSwitch
              checked={!!extraPaxState[RoomIndex]}
              onChange={() => handleExtraPaxClick(RoomIndex)}
            />{" "}
            Extra Pax
          </label>
          <label>
            <ToggleSwitch
              checked={!!extraChildState[RoomIndex]}
              onChange={() => handleExtraChildClick(RoomIndex)}
            />{" "}
            Extra Child
          </label>
          <label>
            <ToggleSwitch
              checked={!!stopSellState[RoomIndex]}
              onChange={() => handleStopSellClick(RoomIndex)}
            />{" "}
            Stop Sell
          </label>
        </div>
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              {days.map((day) => (
                <StyledTableCell key={day}>{day}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Standard rows (Single, Double, Triple) */}
            {rows
              .filter(
                (RowsType) =>
                  RowsType.name !== "Extra Pax" &&
                  RowsType.name !== "Extra Child"
              )
              .map((RowsType) => (
                <TableRow key={RowsType.id}>
                  <StyledTableCell>{RowsType.name}</StyledTableCell>
                  {[...Array(7)].map((_, dayIndex) => (
                    <StyledTableCell key={dayIndex}>
                      <NumberInput 
                        roomIndex={RoomIndex} 
                        rowType={RowsType.id} 
                        dayIndex={dayIndex} 
                      />
                    </StyledTableCell>
                  ))}
                </TableRow>
              ))}

            {/* Extra Pax row (conditional) */}
            {extraPaxState[RoomIndex] &&
              rows
                .filter((RowsType) => RowsType.name === "Extra Pax")
                .map((RowsType) => (
                  <TableRow key={RowsType.id}>
                    <StyledTableCell>{RowsType.name}</StyledTableCell>
                    {[...Array(7)].map((_, dayIndex) => (
                      <StyledTableCell key={dayIndex}>
                        <NumberInput 
                          roomIndex={RoomIndex} 
                          rowType={RowsType.id} 
                          dayIndex={dayIndex} 
                        />
                      </StyledTableCell>
                    ))}
                  </TableRow>
                ))}

            {/* Extra Child row (conditional) */}
            {extraChildState[RoomIndex] &&
              rows
                .filter((RowsType) => RowsType.name === "Extra Child")
                .map((RowsType) => (
                  <TableRow key={RowsType.id}>
                    <StyledTableCell>{RowsType.name}</StyledTableCell>
                    {[...Array(7)].map((_, dayIndex) => (
                      <StyledTableCell key={dayIndex}>
                        <NumberInput 
                          roomIndex={RoomIndex} 
                          rowType={RowsType.id} 
                          dayIndex={dayIndex} 
                        />
                      </StyledTableCell>
                    ))}
                  </TableRow>
                ))}

            {/* Stop Sell row (conditional) */}
            {stopSellState[RoomIndex] &&
              ["stoposell"].map((RowsType) => (
                <TableRow key={RowsType}>
                  <StyledTableCell>{RowsType}</StyledTableCell>
                  {[...Array(7)].map((_, dayIndex) => (
                    <StyledTableCell
                      key={dayIndex}
                      style={{ textAlign: "center" }}
                    >
                      <ToggleSwitch
                        checked={
                          stopSellValues[`${RoomIndex}-${dayIndex}`] === "1"
                        }
                        onChange={(e) =>
                          handleStopSellValueChange(
                            RoomIndex,
                            dayIndex,
                            e.target.checked
                          )
                        }
                      />
                    </StyledTableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        {form === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                mb={2}
              >
                <Typography variant="h5">
                  BULK UPDATE / MULTIPLE RATE
                </Typography>
                <div className="search-group date-group">
                  <label>Date</label>
                  <div className="date-inputs">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span>-</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <Box>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Update
                  </StyledButton>
                </Box>
              </Box>
              {room.map((RoomType, index) => (
                <React.Fragment key={RoomType.rateplanid}>
                  <RateTable
                    title={
                      RoomType.roomtypename +
                      " : " +
                      RoomType.roomtypename +
                      " - " +
                      RoomType.scplanname
                    }
                    RoomIndex={index}
                  />
                  <Box my={2} />
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        )}
        {form !== 0 && <MultipleRate setForm={setForm} />}
      </Container>
    </ThemeProvider>
  );
};

export default HotelRateManager;