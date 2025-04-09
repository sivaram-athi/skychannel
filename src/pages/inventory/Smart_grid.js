import React, { useState, useEffect } from "react";
// import axios from "axios";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import $ from "jquery";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import ToggleSwitch from "./ToggleSwitch";

const RateManagement = () => {
  const [selectedDays, setSelectedDays] = useState({
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: true,
    Sun: true,
  });

  const [property, setProperty] = useState("Canyon Sun Hotel");
  const currentDate = new Date();
  const nextMonthDate = new Date(currentDate);
  nextMonthDate.setMonth(currentDate.getMonth() + 1);
  const [room, setRoom] = useState("0");
  const [rows, setRows] = useState();
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [map, setMap] = useState(0);
  const [maprow, setMaprow] = useState();
  const [header, setHeader] = useState();
  const [isCutOff, setIsCutOff] = useState(0);
  const [isSoldCount, setIsSoldCount] = useState(0);
  const [setInputValues] = useState({});
  const [startDate, setStartDate] = useState(
    currentDate.toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    nextMonthDate.toISOString().split("T")[0]
  );

  const [dates, setDates] = useState(
    generateDateRange(
      currentDate.toISOString().split("T")[0],
      nextMonthDate.toISOString().split("T")[0]
    )
  );
  const [stopSellValues, setStopSellValues] = useState({});
  const [cutOffValues, setCutOffValues] = useState({});
  // const [rates, setRates] = useState([]);
  const [setOutput] = useState();

  const [focusedInput, setFocusedInput] = useState({
    rowIndex: null,
    dateIndex: null,
  });

  const [allStopSell, setAllStopSell] = useState(false);

  const handleInputFocus = (rowIndex, dateIndex) => {
    setFocusedInput({ rowIndex, dateIndex });
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (focusedInput.rowIndex !== null && focusedInput.dateIndex !== null) {
        setFocusedInput({ rowIndex: null, dateIndex: null });
      }
    }, 100);
  };

  const handleLeft = (rowIndex, dateIndex) => {
    const newRows = [...rows];
    const currentValue = newRows[rowIndex].values.find(
      (v) => v.date === dates[dateIndex].toISOString().split("T")[0]
    )?.allocateCount;

    const currentStopSell = newRows[rowIndex].values.find(
      (v) => v.date === dates[dateIndex].toISOString().split("T")[0]
    )?.stopSell;

    const currentCutOff = newRows[rowIndex].values.find(
      (v) => v.date === dates[dateIndex].toISOString().split("T")[0]
    )?.cut_off;

    if (currentValue !== undefined) {
      for (let i = 0; i < dateIndex; i++) {
        const date = dates[i].toISOString().split("T")[0];
        const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
          weekday: "short",
        });
        if (!selectedDays[dayOfWeek]) continue; // Skip if the day is not selected

        const valueIndex = newRows[rowIndex].values.findIndex(
          (v) => v.date === date
        );

        if (valueIndex !== -1) {
          newRows[rowIndex].values[valueIndex].allocateCount = currentValue;
          newRows[rowIndex].values[valueIndex].stopSell = currentStopSell || 0;
          newRows[rowIndex].values[valueIndex].cut_off = currentCutOff || 0;
        } else {
          newRows[rowIndex].values.push({
            date,
            allocateCount: currentValue,
            stopSell: currentStopSell || 0,
            cut_off: currentCutOff || 0,
          });
        }
      }
    }

    setRows(newRows);
    console.log("Updated rows after handleLeft:", newRows);
  };

  const handleRight = (rowIndex, dateIndex) => {
    const newRows = [...rows];
    const currentValue = newRows[rowIndex].values.find(
      (v) => v.date === dates[dateIndex].toISOString().split("T")[0]
    )?.allocateCount;

    const currentStopSell = newRows[rowIndex].values.find(
      (v) => v.date === dates[dateIndex].toISOString().split("T")[0]
    )?.stopSell;

    const currentCutOff = newRows[rowIndex].values.find(
      (v) => v.date === dates[dateIndex].toISOString().split("T")[0]
    )?.cut_off;

    if (currentValue !== undefined) {
      for (let i = dateIndex + 1; i < dates.length; i++) {
        const date = dates[i].toISOString().split("T")[0];
        const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
          weekday: "short",
        });
        if (!selectedDays[dayOfWeek]) continue; // Skip if the day is not selected

        const valueIndex = newRows[rowIndex].values.findIndex(
          (v) => v.date === date
        );

        if (valueIndex !== -1) {
          newRows[rowIndex].values[valueIndex].allocateCount = currentValue;
          newRows[rowIndex].values[valueIndex].stopSell = currentStopSell || 0;
          newRows[rowIndex].values[valueIndex].cut_off = currentCutOff || 0;
        } else {
          newRows[rowIndex].values.push({
            date,
            allocateCount: currentValue,
            stopSell: currentStopSell || 0,
            cut_off: currentCutOff || 0,
          });
        }
      }
    }

    setRows(newRows);
    console.log("Updated rows after handleRight:", newRows);
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  const handleRateChange = (rowIndex, dateIndex, type, value) => {
    console.log(
      `handleRateChange called with rowIndex: ${rowIndex}, dateIndex: ${dateIndex}, type: ${type}, value: ${value}`
    );
    const newRows = [...rows];
    const date = dates[dateIndex].toISOString().split("T")[0];
    const newValue = parseInt(value) || 0;

    const valueIndex = newRows[rowIndex].values.findIndex(
      (v) => v.date === date
    );
    if (valueIndex !== -1) {
      newRows[rowIndex].values[valueIndex].allocateCount = newValue;
      if (stopSellValues[date] === "1") {
        newRows[rowIndex].values[valueIndex].stopSell = 1;
      }
    } else {
      newRows[rowIndex].values.push({
        date,
        allocateCount: newValue,
        stopSell: stopSellValues[date] === "1" ? 1 : 0, // Set stopSell to 1 if checked
        cut_off: 0,
      });
    }

    setRows(newRows);
    console.log("Updated rows:", newRows);
  };

  const toggleDay = (day) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleCloseModal = () => {
    const updatedValues = {};
    const inputs = document.querySelectorAll(".rate-input");
    inputs.forEach((input) => {
      updatedValues[input.id] = input.value;
    });
    setInputValues(updatedValues);
    var test = 0;
    let keys = Object.keys(updatedValues);
    for (let i = 1; i < keys.length; i++) {
      if (updatedValues[keys[i]] === "") {
        test = 1;
        break;
      }
    }
    console.log(updatedValues);
    if (test === 0) {
      $.ajax({
        url: "https://beedesk.skyhms.in/skychnl/store_inventory_room_channel",
        type: "POST",
        data: {
          updatedValues: updatedValues,
        },
        dataType: "json",
        success: function (response) {
          if (response.success === true) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Added successfully!",
              timer: 2000,
              showConfirmButton: false,
            });
            setMap(0);
          }
        },
      });
    } else {
      alert("There are empty values. Please fill in all fields.");
    }
  };

  const transformData = (data) => {
    const transformed = data.reduce((acc, item) => {
      const roomId = item.scroomtypeid;
      const roomName = item.roomtypename; // Assuming roomtypename is available in the response
      const date = item.forthedate;
      const allocateCount = item.allocatecount;
      const stopSell = item.stopsell;
      const scotainvtrnid = item.scotainvtrnid;
      const cut_off = item.cut_off;
      const soldcount = item.soldcount;
      const otaid = item.otaid;
      const scotartypetrnid = item.scotartypetrnid;

      if (!acc[roomId]) {
        acc[roomId] = {
          id: roomId,
          name: roomName,
          values: [],
        };
      }

      acc[roomId].values.push({
        date,
        allocateCount,
        stopSell,
        scotainvtrnid,
        cut_off,
        soldcount,
        otaid,
        scotartypetrnid,
      });

      return acc;
    }, {});

    const stopSellValues = data.reduce((acc, item) => {
      const date = item.forthedate;
      acc[date] = item.stopsell;
      return acc;
    }, {});

    setStopSellValues(stopSellValues);

    const cutOffValues = data.reduce((acc, item) => {
      const date = item.forthedate;
      acc[date] = item.cut_off;
      return acc;
    }, {});

    setCutOffValues(cutOffValues);

    return Object.values(transformed);
  };

  const handleStopSellChange = (dateIndex) => {
    const date = dates[dateIndex].toISOString().split("T")[0];
    const newStopSellValues = { ...stopSellValues };
    newStopSellValues[date] = newStopSellValues[date] === "1" ? "0" : "1";

    const newRows = rows.map((row) => {
      row.values.forEach((v) => {
        if (v.date === date) {
          v.stopSell = newStopSellValues[date];
        }
      });
      return row;
    });

    setStopSellValues(newStopSellValues);
    setRows(newRows);
  };

  const handleCutOffChange = (dateIndex) => {
    const date = dates[dateIndex].toISOString().split("T")[0];
    const newCutOffValues = { ...cutOffValues };
    newCutOffValues[date] = newCutOffValues[date] === "1" ? "0" : "1";

    const newRows = rows.map((row) => {
      row.values.forEach((v) => {
        if (v.date === date) {
          v.cut_off = newCutOffValues[date];
        }
      });
      return row;
    });

    setCutOffValues(newCutOffValues);
    setRows(newRows);
  };

   // Function to calculate max end date (1 month from start date)
   const calculateMaxEndDate = (startDateStr) => {
    const start = new Date(startDateStr);
    const maxEnd = new Date(start);
    maxEnd.setMonth(start.getMonth() + 1);
    return maxEnd.toISOString().split("T")[0];
  };

  // Update startDate and enforce the one-month constraint for endDate
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    
    // Calculate max end date (1 month from new start date)
    const maxEndDate = calculateMaxEndDate(newStartDate);
    
    // If current end date is more than one month after new start date, update it
    if (endDate > maxEndDate) {
      setEndDate(maxEndDate);
    }
  };

  // Update endDate with validation
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    const maxEndDate = calculateMaxEndDate(startDate);
    
    // Only allow end date if it's within one month of start date
    if (newEndDate <= maxEndDate) {
      setEndDate(newEndDate);
    } else {
      // If user tries to select an end date beyond one month, set it to the max allowed
      setEndDate(maxEndDate);
      Swal.fire({
        icon: "info",
        title: "Date Range Limit",
        text: "End date cannot be more than one month after start date",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const handleAllStopSellChange = () => {
    const newStopSellValues = {};
    dates.forEach((date) => {
      const dateString = date.toISOString().split("T")[0];
      newStopSellValues[dateString] = allStopSell ? "0" : "1";
    });

    const newRows = rows.map((row) => {
      row.values.forEach((v) => {
        v.stopSell = allStopSell ? "0" : "1";
      });
      return row;
    });

    setAllStopSell(!allStopSell);
    setStopSellValues(newStopSellValues);
    setRows(newRows);
  };

  useEffect(() => {
    $.ajax({
      url: "https://beedesk.skyhms.in/skychnl/get_inventory_data",
      type: "POST",
      data: {
        startDate: startDate,
        endDate: endDate,
      },
      dataType: "json",
      success: function (response) {
        if (response.data === "") {
          fetchData(room);
        } else {
          setOutput(response.data);
          console.log("BV", response.data);
          const transformedRows = transformData(response.data);
          console.log("check", transformedRows);

          setRows(transformedRows);
          setLoading(false);
        }
      },
    });
  }, []);

  const fetchData = (room) => {
    $.ajax({
      url: "https://beedesk.skyhms.in/skychnl/getRoomData1",
      type: "POST",
      dataType: "json",
      success: function (response) {
        // console.log(response);
        const transformedRows = transformData(response);
        setRows(transformedRows);
        setLoading(false);
      },
      error: function () {
        setLoading(false);
      },
    });
  };

  var unmappedRoom = [];
  const fetchRoomData = () => {
    $.ajax({
      url: "https://beedesk.skyhms.in/skychnl/get_unmapped_data",
      type: "POST",
      dataType: "json",
      success: function (response) {
        // console.log(response);
        response.data.map((e) => {
          if (e.scotartypetrnid == null) {
            unmappedRoom.push(e.roomtypeid);
          }
        });
        console.log(unmappedRoom);
        if (unmappedRoom === "") {
          // console.log('hi');
          setMap(0);
          // console.log(map);
          if (response.test !== "") {
            console.log(response.test);
            
            const roomRows = response.test.map((e) => ({
              id: e.roomtypeid,
              name: e.roomtypename,
            })).filter(
              (value, index, self) =>
                index ===
                self.findIndex(
                  (t) => t.id === value.id && t.name === value.name
                )
            );
            console.log(roomRows, "roomRows");
            setMaprow(roomRows);
            setLoading1(false);
            const roomRows1 = response.test
              .map((e) => ({
                id: e.otaid,
                name: e.otaname,
              }))
              .filter(
                (value, index, self) =>
                  index ===
                  self.findIndex(
                    (t) => t.id === value.id && t.name === value.name
                  )
              );
            console.log(roomRows1, "roomRows1");
            setLoading2(false);
            setHeader(roomRows1);
            setMap(1);
          }
          setLoading1(false);
        } else {
          $.ajax({
            url: "https://beedesk.skyhms.in/skychnl/get_room_header",
            type: "POST",
            data: {
              unmappedRoom: unmappedRoom,
            },
            dataType: "json",
            success: function (response) {
              if (response.data !== "") {
                const roomRows = response.data.map((e) => ({
                  id: e.roomtypeid,
                  name: e.roomtypename,
                }));
                setMaprow(roomRows);
                setLoading1(false);
                // const roomRows1 = response.data1.map((e) => ({
                //   id: e.otaid,
                //   name: e.otaname,
                // }));
                const roomRows1 = response.test
                  .map((e) => ({
                    id: e.otaid,
                    name: e.otaname,
                  }))
                  .filter(
                    (value, index, self) =>
                      index ===
                      self.findIndex(
                        (t) => t.id === value.id && t.name === value.name
                      )
                  );
                setHeader(roomRows1);
                setLoading2(false);
                setMap(1);
              } else {
                setLoading3(false);
                // console.log(loading3);
              }
            },
          });
        }
      },
    });
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  const handleSearch = () => {
    const newDates = generateDateRange(startDate, endDate);
    setDates(newDates);
    // setRates(newDates.map(() => ({ single: 1 })));
    $.ajax({
      url: "https://beedesk.skyhms.in/skychnl/get_inventory_data",
      type: "POST",
      data: {
        startDate: startDate,
        endDate: endDate,
      },
      dataType: "json",
      success: function (response) {
        if (response.data === "") {
          fetchData(room);
        } else {
          setOutput(response.data);
          console.log("BV", response.data);
          const transformedRows = transformData(response.data);
          console.log("check", transformedRows);

          setRows(transformedRows);
          setLoading(false);
        }
      },
    });
  };

  const handleOpenModal = () => {
    setMap(1);
  };

  const handleSubmit = () => {
    if (map === 1) {
      handleOpenModal();
      return;
    }
    console.log("final", rows);

    $.ajax({
      url: "https://beedesk.skyhms.in/skychnl/store_inventory",
      type: "POST",
      data: {
        updatedRates: rows,
      },
      dataType: "json",
      success: function (response) {
        if (response.success === true) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Added successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
        }
        $.ajax({
          url: "https://beedesk.skyhms.in/skychnl/get_inventory_data",
          type: "POST",
          data: {
            startDate: startDate,
            endDate: endDate,
          },
          dataType: "json",
          success: function (response) {
            if (response.data === "") {
              fetchData(room);
            } else {
              setOutput(response.data);
              console.log("BV", response.data);
              const transformedRows = transformData(response.data);
              console.log("check", transformedRows);

              setRows(transformedRows);
              setLoading(false);
            }
          },
        });
      },
    });
  };

  function handleChange(e) {
    const selectedRoom = e.target.value;
    setRoom(selectedRoom);
    fetchData(selectedRoom);
  }

  function handleCutOffClick() {
    setIsCutOff(isCutOff === 0 ? 1 : 0);
  }
  function handleSoldCountClick() {
    setIsSoldCount(isSoldCount === 0 ? 1 : 0);
  }

  if (!loading3) {
    return <div>Please Add a Room Type...</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (loading1) {
    return <div>Loading...</div>;
  }
  if (unmappedRoom !== "") {
    if (loading2) {
      return <div>Loading...</div>;
    }
  }
  return (
    <div className="rate-management">
      <div>
        <div className="topbar">
          <div className="title">Inventory Management / Smart Flow</div>
          <div className="action-buttons">
            <button onClick={handleSubmit} className="btn-update">
              Update All
            </button>
            {/* <button className="btn-reset">Reset All</button> */}
          </div>
        </div>
        <div className="search-section">
          <div className="search-row">
            <div className="search-group">
              <label>Property</label>
              <select
                value={property}
                onChange={(e) => setProperty(e.target.value)}
              >
                <option>Canyon Sun Hotel</option>
              </select>
            </div>
            <div className="search-group">
              <label>Rooms</label>
              <select value={room} onChange={handleChange}>
                <option value="0">All</option>
                {rows.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-group date-group">
              <label>Date</label>
              <div className="date-inputs">
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
                <span>-</span>
                <input
                  type="date"
                  value={endDate}
                  min={startDate}
                  max={calculateMaxEndDate(startDate)}
                  onChange={handleEndDateChange}
                />
              </div>
            </div>
            <button className="btn-search" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="rate-accordion">
          <div className="accordion-content">
            <div className="days-section">
              <div className="weekdays">
                {Object.entries(selectedDays).map(([day, isSelected]) => (
                  <button
                    key={day}
                    className={`day-btn ${isSelected ? "active" : ""}`}
                    onClick={() => toggleDay(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <div className="options">
                <label>
                  <ToggleSwitch type="checkbox" onChange={handleCutOffClick} />{" "}
                  Cut Off
                </label>
                <label>
                  <ToggleSwitch
                    type="checkbox"
                    onChange={handleSoldCountClick}
                  />{" "}
                  Sold
                </label>
                {/* <label>
                  <input type="checkbox" /> Close on Arrival
                </label>
                <label>
                  <input type="checkbox" /> Close on Departure
                </label> */}
              </div>
            </div>

            <div className="rates-table">
              <table>
                <thead>
                  <tr>
                    <th>Room Type</th>
                    {dates.map((date, index) => (
                      <th key={index}>
                        <div className="date-header">
                          <div className="weekday">
                            {date.toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </div>
                          <div className="date">
                            {date.toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                            })}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody id="table_body">
                  {rows.map((type, rowIndex) => (
                    <tr key={type.id}>
                      <td className="room-type">{type.name}</td>
                      {dates.map((date, dateIndex) => {
                        const value =
                          type.values.find(
                            (v) => v.date === date.toISOString().split("T")[0]
                          )?.allocateCount || "";
                        const typeName = type.name
                          ? type.name.toLowerCase().replace(/ /g, "")
                          : "";
                        return (
                          <td key={dateIndex}>
                            <div
                              className={`input-container ${
                                focusedInput.rowIndex === rowIndex &&
                                focusedInput.dateIndex === dateIndex
                                  ? "focused"
                                  : ""
                              }`}
                            >
                              <input
                                className="rate-input"
                                type="number"
                                min="0"
                                value={value}
                                onChange={(e) => {
                                  console.log(
                                    "Input value changed:",
                                    e.target.value
                                  );
                                  handleRateChange(
                                    rowIndex,
                                    dateIndex,
                                    typeName,
                                    e.target.value
                                  );
                                }}
                                onFocus={() =>
                                  handleInputFocus(rowIndex, dateIndex)
                                }
                                onBlur={() => handleInputBlur()}
                              />
                              <div
                                className={`expand-options ${
                                  focusedInput.rowIndex === rowIndex &&
                                  focusedInput.dateIndex === dateIndex
                                    ? "active"
                                    : ""
                                }`}
                              >
                                <button
                                  onMouseDown={(e) => {
                                    handleButtonClick(e);
                                    handleLeft(rowIndex, dateIndex);
                                  }}
                                >
                                  <ArrowLeftIcon />
                                </button>
                                <button
                                  onMouseDown={(e) => {
                                    handleButtonClick(e);
                                    handleRight(rowIndex, dateIndex);
                                  }}
                                >
                                  <ArrowRightIcon />
                                </button>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {["Stop Sell"].map((type) => (
                    <tr key={type}>
                      <td
                        className="room-type"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <p style={{ margin: "0" }}>{type}</p>
                        <ToggleSwitch
                          // type="radio"
                          checked={allStopSell}
                          onChange={handleAllStopSellChange}
                          style={{ marginLeft: "10px" }}
                        />
                      </td>
                      {dates.map((date, dateIndex) => {
                        const stopSell =
                          stopSellValues[date.toISOString().split("T")[0]] ===
                          "1";
                        return (
                          <td key={dateIndex}>
                            <ToggleSwitch
                              checked={stopSell} // Bind the toggle switch state
                              onChange={() => handleStopSellChange(dateIndex)}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {isCutOff === 1 &&
                    ["Cut Off"].map((type) => (
                      <tr key={type}>
                        <td className="room-type">{type}</td>
                        {dates.map((date, dateIndex) => {
                          const cut_off =
                            cutOffValues[date.toISOString().split("T")[0]] ===
                            "1";
                          return (
                            <td key={dateIndex}>
                              <ToggleSwitch
                                checked={cut_off} // Bind the toggle switch state
                                onChange={() => handleCutOffChange(dateIndex)}
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  {isSoldCount === 1 &&
                    ["Sold Count"].map((type) => (
                      <tr key={type}>
                        <td className="room-type">{type}</td>
                        {dates.map((date, dateIndex) => {
                          // const cut_off =
                          //   cutOffValues[date.toISOString().split("T")[0]] ===
                          //   "1";
                          return (
                            <td key={dateIndex}>
                              <input
                                readOnly
                                className="rate-input"
                                type="number"
                                min="0"
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {map === 1 && (
        <Dialog
          open={map === 1}
          onClose={handleCloseModal}
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle>Modal Title</DialogTitle>
          <DialogContent>
            <div className="rates-table">
              <table>
                <thead>
                  <tr>
                    <th>Room Type</th>
                    {header.map((type, rowIndex) => (
                      <th key={type.id}>{type.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {maprow.map((type, rowIndex) => (
                    <tr key={type.id}>
                      <td>{type.name}</td>
                      {header.map((types, rowIndex) => (
                        <td key={types.id}>
                          <input
                            type="text"
                            style={{ height: "25px", borderRadius: "10px" }}
                            className="rate-input"
                            id={type.id + "_" + types.id}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              color="success"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

const generateDateRange = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dateArray = [];

  while (startDate <= endDate) {
    dateArray.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  return dateArray;
};

export default RateManagement;
