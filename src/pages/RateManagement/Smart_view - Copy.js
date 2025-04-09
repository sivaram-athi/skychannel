import React, { useState, useEffect } from "react";
import "./smartview.css";
import $ from "jquery";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ToggleSwitch from "../inventory/ToggleSwitch";
import axios from "axios";
import Swal from "sweetalert2";

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

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const currentDate = new Date();
  const nextMonthDate = new Date(currentDate);
  nextMonthDate.setMonth(currentDate.getMonth() + 1);
  const [ratePlan, setRatePlan] = useState("Canyon King - CP");
  const [property, setProperty] = useState("Canyon Sun Hotel");
  const [room, setRoom] = useState({});
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
  const [rates, setRates] = useState([]);
  const [rows, setRows] = useState();
  const [isStopSell, setIsStopSell] = useState(0);
  const [isExtraChild, setIsExtraChild] = useState(0);
  const [isExtraPax, setIsExtraPax] = useState(0);
  const [stopSellValues, setStopSellValues] = useState({});
  const [planID, setPlanID] = useState("0");
  const [getPlan, setGetPlan] = useState();
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [extraPaxState, setExtraPaxState] = useState({});
  const [extraChildState, setExtraChildState] = useState({});
  const [stopSellState, setStopSellState] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [tableData, setTableData] = useState({});

  const [focusedInput, setFocusedInput] = useState({
    rowIndex: null,
    dateIndex: null,
    index: null,
  });

  const toggleDay = (day) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleSearch = () => {
    const newDates = generateDateRange(startDate, endDate);
    setDates(newDates);
    getRoomData();
  };

  // useEffect(() => {
  //   setRowsData();
  // }, []);

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
  };

  useEffect(() => {
    axios
      .get("https://beedesk.skyhms.in/skychnl/getRoomType")
      .then((response) => {
        // console.log("Data:", response.data);
        setGetPlan(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleRoomChange = (e) => {
    setPlanID(e.target.value);
    var id = e.target.value;
    fetchRoomData(id);
  };

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

  const updateTableDataValue = (
    roomTypeId,
    ratePlanId,
    dateStr,
    rowType,
    value
  ) => {
    setTableData((prevData) => {
      const newData = { ...prevData };
      if (!newData[roomTypeId]) {
        newData[roomTypeId] = {
          roomTypeName:
            room.find((r) => r.roomtypeid === roomTypeId)?.roomtypename || "",
          ratePlans: {},
        };
      }
      if (!newData[roomTypeId].ratePlans[ratePlanId]) {
        newData[roomTypeId].ratePlans[ratePlanId] = {
          planName:
            room.find((r) => r.rateplanid === ratePlanId)?.scplanname || "",
          mealPlan:
            room.find((r) => r.rateplanid === ratePlanId)?.mealplan || "",
          dates: {},
        };
      }
      if (!newData[roomTypeId].ratePlans[ratePlanId].dates[dateStr]) {
        newData[roomTypeId].ratePlans[ratePlanId].dates[dateStr] = {
          single: null,
          double: null,
          triple: null,
          stopsell: "0",
        };
      }

      const paxMapping = {
        Single: "single",
        Double: "double",
        Triple: "triple",
      };

      if (paxMapping[rowType]) {
        newData[roomTypeId].ratePlans[ratePlanId].dates[dateStr][
          paxMapping[rowType]
        ] = value;
      }

      return newData;
    });
  };

  const handleLeft = (rowIndex, dateIndex, roomIndex) => {
    // Get the value from current cell, if empty try to get existing value from tableData
    const currentRoom = room[roomIndex];
    const dateStr = dates[dateIndex].toISOString().split("T")[0];
    const rowType = rows[rowIndex]?.name;

    let value = inputValues[roomIndex]?.[rowIndex]?.[dateIndex];
    if (!value && currentRoom && rowType) {
      const roomTypeData = tableData[currentRoom.roomtypeid];
      const ratePlanData = roomTypeData?.ratePlans[currentRoom.rateplanid];
      const dateData = ratePlanData?.dates[dateStr];
      value = getCellValue(dateData, rowType, "");
    }

    if (!value) return; // Don't proceed if no value to copy

    const newInputValues = { ...inputValues };

    for (let i = 0; i <= dateIndex; i++) {
      const day = dates[i].toLocaleDateString("en-US", { weekday: "short" });
      if (!selectedDays[day]) continue;

      // Update inputValues
      if (!newInputValues[roomIndex]) newInputValues[roomIndex] = {};
      if (!newInputValues[roomIndex][rowIndex])
        newInputValues[roomIndex][rowIndex] = {};
      newInputValues[roomIndex][rowIndex][i] = value;

      // Update tableData
      const copyDateStr = dates[i].toISOString().split("T")[0];
      if (currentRoom && rowType) {
        updateTableDataValue(
          currentRoom.roomtypeid,
          currentRoom.rateplanid,
          copyDateStr,
          rowType,
          value
        );
      }
    }

    setInputValues(newInputValues);
  };

  const handleRight = (rowIndex, dateIndex, roomIndex) => {
    // Get the value from current cell, if empty try to get existing value from tableData
    const currentRoom = room[roomIndex];
    const dateStr = dates[dateIndex].toISOString().split("T")[0];
    const rowType = rows[rowIndex]?.name;

    let value = inputValues[roomIndex]?.[rowIndex]?.[dateIndex];
    if (!value && currentRoom && rowType) {
      const roomTypeData = tableData[currentRoom.roomtypeid];
      const ratePlanData = roomTypeData?.ratePlans[currentRoom.rateplanid];
      const dateData = ratePlanData?.dates[dateStr];
      value = getCellValue(dateData, rowType, "");
    }

    if (!value) return; // Don't proceed if no value to copy

    const newInputValues = { ...inputValues };

    for (let i = dateIndex; i < dates.length; i++) {
      const day = dates[i].toLocaleDateString("en-US", { weekday: "short" });
      if (!selectedDays[day]) continue;

      // Update inputValues
      if (!newInputValues[roomIndex]) newInputValues[roomIndex] = {};
      if (!newInputValues[roomIndex][rowIndex])
        newInputValues[roomIndex][rowIndex] = {};
      newInputValues[roomIndex][rowIndex][i] = value;

      // Update tableData
      const copyDateStr = dates[i].toISOString().split("T")[0];
      if (currentRoom && rowType) {
        updateTableDataValue(
          currentRoom.roomtypeid,
          currentRoom.rateplanid,
          copyDateStr,
          rowType,
          value
        );
      }
    }

    setInputValues(newInputValues);
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (focusedInput.rowIndex !== null && focusedInput.dateIndex !== null) {
        setFocusedInput({ rowIndex: null, dateIndex: null, index: null });
      }
    }, 100);
  };

  const handleInputFocus = (rowIndex, dateIndex, index) => {
    setFocusedInput({ rowIndex, dateIndex, index });
  };

  const formatRoomData = (accordionIndex) => {
    const formattedData = [];
    const roomType = room[accordionIndex];
    const updatedDates = new Set();

    // First add rate data and mark which dates have been processed
    rows.forEach((row, rowIndex) => {
      dates.forEach((date, dateIndex) => {
        // Added dateIndex parameter here
        const dateStr = date.toISOString().split("T")[0];
        const value =
          inputValues[accordionIndex]?.[rowIndex]?.[dateIndex] || "";
        const stopSell =
          stopSellValues[accordionIndex]?.[dateStr] === "1" ? "1" : "0";

        // Only add if there's a value or stop sell is enabled
        if (value || stopSell === "1") {
          updatedDates.add(dateStr);

          formattedData.push({
            rowid: row.id,
            rowdate: dateStr,
            value: value,
            stopsell: stopSell,
            roomtypeid: roomType.roomtypeid,
            mealplan: roomType.mealplan,
            rateplanid: roomType.rateplanid,
            otaid: "1",
          });
        }
      });
    });

    // Then add stop sell only entries for dates not already processed
    dates.forEach((date) => {
      const dateStr = date.toISOString().split("T")[0];
      const stopSell = stopSellValues[accordionIndex]?.[dateStr];

      if (stopSell === "1" && !updatedDates.has(dateStr)) {
        ["1", "2", "3", "e", "c"].forEach((paxType) => {
          formattedData.push({
            rowid: paxType,
            rowdate: dateStr,
            value: "",
            stopsell: "1",
            roomtypeid: roomType.roomtypeid,
            mealplan: roomType.mealplan,
            rateplanid: roomType.rateplanid,
            otaid: "1",
          });
        });
      }
    });

    return formattedData;
  };

  const handleSubmit = (accordionIndex) => {
    const formattedData = formatRoomData(accordionIndex);
    console.log("Formatted Data:", formattedData);

    // if (formattedData.length) {
    //   $.ajax({
    //     url: "https://beedesk.skyhms.in/skychnl/allocateRoom",
    //     type: "POST",
    //     data: {
    //       data: JSON.stringify(formattedData),
    //     },
    //     dataType: "json",
    //     success: function (response) {
    //       console.log("Data:", response);
    //       if (response.success === true) {
    //         // Update local tableData to reflect changes
    //         setTableData((prevData) => {
    //           const newData = { ...prevData };
    //           const currentRoom = room[accordionIndex];

    //           formattedData.forEach((item) => {
    //             if (
    //               !newData[currentRoom.roomtypeid]?.ratePlans[
    //                 currentRoom.rateplanid
    //               ]?.dates[item.rowdate]
    //             ) {
    //               // Initialize date entry if it doesn't exist
    //               if (!newData[currentRoom.roomtypeid]) {
    //                 newData[currentRoom.roomtypeid] = {
    //                   roomTypeName: currentRoom.roomtypename,
    //                   ratePlans: {},
    //                 };
    //               }
    //               if (
    //                 !newData[currentRoom.roomtypeid].ratePlans[
    //                   currentRoom.rateplanid
    //                 ]
    //               ) {
    //                 newData[currentRoom.roomtypeid].ratePlans[
    //                   currentRoom.rateplanid
    //                 ] = {
    //                   dates: {},
    //                   planName: currentRoom.scplanname,
    //                   mealPlan: currentRoom.mealplan,
    //                 };
    //               }
    //               newData[currentRoom.roomtypeid].ratePlans[
    //                 currentRoom.rateplanid
    //               ].dates[item.rowdate] = {
    //                 single: null,
    //                 double: null,
    //                 triple: null,
    //                 extraPax: null,
    //                 extraChild: null,
    //                 stopsell: item.stopsell,
    //               };
    //             }

    //             // Map rowid to field name
    //             const fieldMapping = {
    //               1: "single",
    //               2: "double",
    //               3: "triple",
    //               e: "extraPax",
    //               c: "extraChild",
    //             };

    //             const dateEntry =
    //               newData[currentRoom.roomtypeid].ratePlans[
    //                 currentRoom.rateplanid
    //               ].dates[item.rowdate];
    //             if (fieldMapping[item.rowid]) {
    //               dateEntry[fieldMapping[item.rowid]] = item.value || null;
    //             }
    //             dateEntry.stopsell = item.stopsell;
    //           });

    //           return newData;
    //         });

    //         Swal.fire({
    //           icon: "success",
    //           title: "Success",
    //           text: "Data Updated Successfully!",
    //           timer: 2000,
    //           showConfirmButton: false,
    //         });
    //       }
    //     },
    //   });
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: "Please add values or make changes first!",
    //     timer: 2000,
    //     showConfirmButton: false,
    //   });
    // }
  };

  useEffect(() => {
    getRoomData();
  }, []);

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

  const transformResponseData = (data) => {
    // Filter for otaid = 1
    const filteredData = data.filter((item) => item.otaid === "1");

    // Create the transformed structure
    const transformed = filteredData.reduce((acc, item) => {
      const roomTypeId = item.scroomtypeid;
      const ratePlanId = item.scroomrateplanid;
      const date = item.forthedate;
      const pax = item.pax; // Don't parse as integer since 'e' and 'c' are strings

      // Initialize room type if not exists
      if (!acc[roomTypeId]) {
        acc[roomTypeId] = {
          roomTypeName: item.roomtypename,
          ratePlans: {},
        };
      }

      // Initialize rate plan if not exists
      if (!acc[roomTypeId].ratePlans[ratePlanId]) {
        acc[roomTypeId].ratePlans[ratePlanId] = {
          planName: item.scplanname,
          mealPlan: item.mealplan,
          dates: {},
        };
      }

      // Initialize date if not exists
      if (!acc[roomTypeId].ratePlans[ratePlanId].dates[date]) {
        acc[roomTypeId].ratePlans[ratePlanId].dates[date] = {
          single: null,
          double: null,
          triple: null,
          extraPax: null,
          extraChild: null,
          stopsell: item.stopsell,
        };
      }

      // Map pax values to fields
      const paxMapping = {
        1: "single",
        2: "double",
        3: "triple",
        e: "extraPax",
        c: "extraChild",
      };

      if (paxMapping[pax]) {
        acc[roomTypeId].ratePlans[ratePlanId].dates[date][paxMapping[pax]] =
          Number(item.rate);
      }

      return acc;
    }, {});

    return transformed;
  };

  const getRoomData = () => {
    $.ajax({
      url: "https://beedesk.skyhms.in/skychnl/get_Room_data",
      type: "POST",
      data: {
        startDate: startDate,
        endDate: endDate,
      },
      dataType: "json",
      success: function (response) {
        if (response.data === "") {
          console.log("No Data Found");
          setRowsData();
        } else {
          const transformedData = transformResponseData(response.data);
          console.log("data:", response.data);
          setTableData(transformedData);
          console.log("Transformed data:", transformedData);
          setRowsData();
        }
      },
    });
  };

  const handleStopSellChange = (dateIndex, roomIndex) => {
    const date = dates[dateIndex].toISOString().split("T")[0];
    const newStopSellValues = { ...stopSellValues };
    const currentRoom = room[roomIndex];

    // Update stopSellValues
    if (!newStopSellValues[roomIndex]) {
      newStopSellValues[roomIndex] = {};
    }
    const newValue = newStopSellValues[roomIndex][date] === "1" ? "0" : "1";
    newStopSellValues[roomIndex][date] = newValue;

    // Update tableData
    setTableData((prevData) => {
      const newData = { ...prevData };
      if (
        currentRoom &&
        newData[currentRoom.roomtypeid]?.ratePlans[currentRoom.rateplanid]
      ) {
        const ratePlan =
          newData[currentRoom.roomtypeid].ratePlans[currentRoom.rateplanid];

        if (!ratePlan.dates[date]) {
          ratePlan.dates[date] = {
            single: null,
            double: null,
            triple: null,
            extraPax: null,
            extraChild: null,
            stopsell: "0",
          };
        }
        ratePlan.dates[date].stopsell = newValue;
      }
      return newData;
    });

    setStopSellValues(newStopSellValues);
  };

  const handleGlobalStopSellChange = (e, index) => {
    const newValue = e.target.checked ? "1" : "0";
    const currentRoom = room[index];
    const newStopSellValues = { ...stopSellValues };

    // Update stopSellValues for all dates
    if (!newStopSellValues[index]) {
      newStopSellValues[index] = {};
    }

    // Update both stopSellValues and tableData for all dates
    setTableData((prevData) => {
      const newData = { ...prevData };

      if (
        currentRoom &&
        newData[currentRoom.roomtypeid]?.ratePlans[currentRoom.rateplanid]
      ) {
        const ratePlan =
          newData[currentRoom.roomtypeid].ratePlans[currentRoom.rateplanid];

        dates.forEach((date) => {
          const dateStr = date.toISOString().split("T")[0];
          newStopSellValues[index][dateStr] = newValue;

          if (!ratePlan.dates[dateStr]) {
            ratePlan.dates[dateStr] = {
              single: null,
              double: null,
              triple: null,
              extraPax: null,
              extraChild: null,
              stopsell: "0",
            };
          }
          ratePlan.dates[dateStr].stopsell = newValue;
        });
      }

      return newData;
    });

    setStopSellValues(newStopSellValues);
  };

  const handleAccordionClick = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  const handleInputChange = (rowIndex, dateIndex, value, accordionIndex) => {
    // Update inputValues as before
    setInputValues((prevState) => ({
      ...prevState,
      [accordionIndex]: {
        ...prevState[accordionIndex],
        [rowIndex]: {
          ...prevState[accordionIndex]?.[rowIndex],
          [dateIndex]: value,
        },
      },
    }));

    // Get current room and date information
    const currentRoom = room[accordionIndex];
    const dateStr = dates[dateIndex].toISOString().split("T")[0];
    const rowType = rows[rowIndex]?.name;

    // Update tableData
    if (currentRoom && rowType) {
      updateTableDataValue(
        currentRoom.roomtypeid,
        currentRoom.rateplanid,
        dateStr,
        rowType,
        value
      );
    }
  };

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

  if (loading) {
    return <div>Loading...</div>;
  }
  if (loading1) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rate-management">
      <div className="topbar" style={{ marginBottom: "0px" }}>
        <div className="title">Rate Management / Grid View</div>
      </div>
      <div
        className="search-section"
        style={{ padding: "0", paddingBottom: "20px" }}
      >
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
            <select value={planID} onChange={handleRoomChange}>
              <option value={0}>All</option>
              {getPlan.map((type) => (
                <option key={type.roomtypeid} value={type.roomtypeid}>
                  {type.roomtypename}
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
      {room.map((type, index) => (
        <div className="rate-accordion" key={type.rateplanid}>
          <div
            className="accordion-header"
            onClick={() => handleAccordionClick(index)}
          >
            <span className="accordion-arrow">
              {openAccordionIndex === index ? "▼" : "▶"}
            </span>
            {type.roomtypename} - {type.scplanname}
          </div>

          {openAccordionIndex === index && (
            <div className="accordion-content">
              <div className="days-section" style={{ paddingBottom: "2px" }}>
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
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="options" style={{marginLeft:"17px"}}>
                  {/* <label>Others</label> */}
                  <label>
                    <ToggleSwitch
                      // type="checkbox"
                      checked={!!extraPaxState[index]}
                      onChange={() => handleExtraPaxClick(index)}
                    />{" "}
                    Extra Pax
                  </label>
                  <label>
                    <ToggleSwitch
                      // type="checkbox"
                      checked={!!extraChildState[index]}
                      onChange={() => handleExtraChildClick(index)}
                    />{" "}
                    Extra Child
                  </label>
                  {/* <label>
                    <input type="checkbox" /> Min Stay
                  </label>
                  <label>
                    <input type="checkbox" /> Max Stay
                  </label> */}
                  <label>
                    <ToggleSwitch
                      // type="checkbox"
                      checked={!!stopSellState[index]}
                      onChange={() => handleStopSellClick(index)}
                    />{" "}
                    Stop Sell
                  </label>
                </div>
                <div
                  className="action-buttons"
                  style={{ marginBottom: "10px", marginRight: "10px",marginTop:"0px" }}
                >
                  <button
                    className="btn-update"
                    onClick={() => handleSubmit(index)}
                  >
                    Update All
                  </button>
                  {/* <button className="btn-reset">Reset All</button> */}
                </div>
              </div>
              <div className="rates-table">
                <table>
                  <thead>
                    <tr>
                      <th></th>
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
                  <tbody>
                    {rows
                      .filter(
                        (rowType) =>
                          rowType.name !== "Extra Pax" &&
                          rowType.name !== "Extra Child"
                      )
                      .map((rowType, rowIndex) => (
                        <tr key={rowType.id}>
                          <td className="room-type">{rowType.name}</td>
                          {dates.map((date, dateIndex) => {
                            const dateStr = date.toISOString().split("T")[0];
                            // Use the current room's IDs from the room array
                            const currentRoom = room[index];
                            const roomTypeData =
                              tableData[currentRoom.roomtypeid];
                            const ratePlanData =
                              roomTypeData?.ratePlans[currentRoom.rateplanid];
                            const dateData = ratePlanData?.dates[dateStr];

                            // Map row names to data fields
                            const value = getCellValue(
                              dateData,
                              rowType.name,
                              inputValues[index]?.[rowIndex]?.[dateIndex]
                            );

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
                                      handleInputChange(
                                        rowIndex,
                                        dateIndex,
                                        e.target.value,
                                        index
                                      );
                                    }}
                                    onFocus={() =>
                                      handleInputFocus(
                                        rowIndex,
                                        dateIndex,
                                        index
                                      )
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
                                        handleLeft(rowIndex, dateIndex, index);
                                      }}
                                    >
                                      <ArrowLeftIcon />
                                    </button>
                                    <button
                                      onMouseDown={(e) => {
                                        handleButtonClick(e);
                                        handleRight(rowIndex, dateIndex, index);
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

                    {/* Rest of the tbody content (Extra Pax, Extra Child, Stop Sell) remains the same */}
                    {extraPaxState[index] &&
                      rows
                        .filter((type) => type.name === "Extra Pax")
                        .map((type) => {
                          const rowIndex = rows.findIndex(
                            (row) => row.id === type.id
                          );
                          return (
                            <tr key={type.id}>
                              <td className="room-type">{type.name}</td>
                              {dates.map((date, dateIndex) => {
                                const dateStr = date
                                  .toISOString()
                                  .split("T")[0];
                                const currentRoom = room[index];
                                const roomTypeData =
                                  tableData[currentRoom.roomtypeid];
                                const ratePlanData =
                                  roomTypeData?.ratePlans[
                                    currentRoom.rateplanid
                                  ];
                                const dateData = ratePlanData?.dates[dateStr];
                                const value = getCellValue(
                                  dateData,
                                  type.name,
                                  inputValues[index]?.[rowIndex]?.[dateIndex]
                                );

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
                                          // console.log(
                                          //   "Input value changed:",
                                          //   e.target.value
                                          // );
                                          handleInputChange(
                                            rowIndex,
                                            dateIndex,
                                            e.target.value,
                                            index
                                          );
                                        }}
                                        onFocus={() =>
                                          handleInputFocus(
                                            rowIndex,
                                            dateIndex,
                                            index
                                          )
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
                                            handleLeft(
                                              rowIndex,
                                              dateIndex,
                                              index
                                            );
                                          }}
                                        >
                                          <ArrowLeftIcon />
                                        </button>
                                        <button
                                          onMouseDown={(e) => {
                                            handleButtonClick(e);
                                            handleRight(
                                              rowIndex,
                                              dateIndex,
                                              index
                                            );
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
                          );
                        })}
                    {extraChildState[index] &&
                      rows
                        .filter((type) => type.name === "Extra Child")
                        .map((type) => {
                          const rowIndex = rows.findIndex(
                            (row) => row.id === type.id
                          );
                          return (
                            <tr key={type.id}>
                              <td className="room-type">{type.name}</td>
                              {dates.map((date, dateIndex) => {
                                const dateStr = date
                                  .toISOString()
                                  .split("T")[0];
                                const currentRoom = room[index];
                                const roomTypeData =
                                  tableData[currentRoom.roomtypeid];
                                const ratePlanData =
                                  roomTypeData?.ratePlans[
                                    currentRoom.rateplanid
                                  ];
                                const dateData = ratePlanData?.dates[dateStr];
                                const value = getCellValue(
                                  dateData,
                                  type.name,
                                  inputValues[index]?.[rowIndex]?.[dateIndex]
                                );

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
                                          // console.log(
                                          //   "Input value changed:",
                                          //   e.target.value
                                          // );
                                          handleInputChange(
                                            rowIndex,
                                            dateIndex,
                                            e.target.value,
                                            index
                                          );
                                        }}
                                        onFocus={() =>
                                          handleInputFocus(
                                            rowIndex,
                                            dateIndex,
                                            index
                                          )
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
                                            handleLeft(
                                              rowIndex,
                                              dateIndex,
                                              index
                                            );
                                          }}
                                        >
                                          <ArrowLeftIcon />
                                        </button>
                                        <button
                                          onMouseDown={(e) => {
                                            handleButtonClick(e);
                                            handleRight(
                                              rowIndex,
                                              dateIndex,
                                              index
                                            );
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
                          );
                        })}
                    {stopSellState[index] &&
                      ["Stop Sell"].map((type) => (
                        <tr key={type}>
                          <td
                            className="room-type"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                              gap: "10px",
                            }}
                          >
                            <p style={{ margin: "0" }}>{type}</p>
                            <ToggleSwitch
                              // type="checkbox"
                              checked={dates.every(
                                (date) =>
                                  stopSellValues[index]?.[
                                    date.toISOString().split("T")[0]
                                  ] === "1"
                              )}
                              onChange={(e) =>
                                handleGlobalStopSellChange(e, index)
                              }
                            />
                          </td>
                          {dates.map((date, dateIndex) => {
                            const dateStr = date.toISOString().split("T")[0];
                            const currentRoom = room[index];
                            const roomTypeData =
                              tableData[currentRoom.roomtypeid];
                            const ratePlanData =
                              roomTypeData?.ratePlans[currentRoom.rateplanid];
                            const dateData = ratePlanData?.dates[dateStr];

                            // Use the stopsell value from tableData if available
                            const isChecked =
                              stopSellValues[index]?.[dateStr] === "1" ||
                              dateData?.stopsell === "1";

                            return (
                              <td key={dateIndex}>
                                <ToggleSwitch
                                  checked={isChecked}
                                  onChange={() =>
                                    handleStopSellChange(dateIndex, index)
                                  }
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
          )}
        </div>
      ))}
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

const getCellValue = (dateData, rowType, inputValue) => {
  if (!dateData) return inputValue || "";

  switch (rowType) {
    case "Single":
      return inputValue || dateData.single || "";
    case "Double":
      return inputValue || dateData.double || "";
    case "Triple":
      return inputValue || dateData.triple || "";
    case "Extra Pax":
      return inputValue || dateData.extraPax || "";
    case "Extra Child":
      return inputValue || dateData.extraChild || "";
    default:
      return inputValue || "";
  }
};

export default RateManagement;
