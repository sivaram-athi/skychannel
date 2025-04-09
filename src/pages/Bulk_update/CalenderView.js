// HotelInventoryManager.jsx
import React, { useEffect, useState } from "react";
import "./Calender.css";
import $ from "jquery";
// import Inventory from "./Inventory";
import ToggleSwitch from "../inventory/ToggleSwitch";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const HotelInventoryManager = () => {
  const [allocation, setAllocation] = useState(Array(7).fill(""));
  const [stopSell, setStopSell] = useState(Array(7).fill(false));
  const currentDate = new Date();
  const nextMonthDate = new Date(currentDate);
  nextMonthDate.setMonth(currentDate.getMonth() + 1);
  const [startDate, setStartDate] = useState(
    currentDate.toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    nextMonthDate.toISOString().split("T")[0]
  );
  const [rows, setRows] = useState();
  const [map, setMap] = useState(0);
  const [maprow, setMaprow] = useState();
  const [room, setRoom] = useState("0");
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [setInputValues] = useState({});
  const [loading2, setLoading2] = useState(true);
  const [header, setHeader] = useState();

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  // const roomTypes = [
  //   {
  //     platform: "Booking.com",
  //     rooms: ["1 Double Room"],
  //   },
  //   {
  //     platform: "Agoda",
  //     rooms: ["1 Standard Double Room"],
  //   },
  //   {
  //     platform: "EaseMyTrip",
  //     rooms: ["1 Platinum Room"],
  //   },
  //   {
  //     platform: "GOIBIBO",
  //     rooms: ["1 Platinum Room"],
  //   },
  // ];

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const inputs = document.querySelectorAll("input");
      const currentIndex = Array.from(inputs).indexOf(e.target);
      if (currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      }
    }
  };

  const fetchData = (room) => {
    $.ajax({
      url: "https://beedesk.skyhms.in/skychnl/getRoomData",
      type: "POST",
      data: {
        id: room,
      },
      dataType: "json",
      success: function (response) {
        console.log(response);
        setRows(response);
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    fetchData(room);
  }, [room]);

  function handleChange(e) {
    const selectedRoom = e.target.value;
    setRoom(selectedRoom);
    fetchData(selectedRoom);
    // console.log(room);
  }

  const handleUpdate = () => {
    const isEmpty = allocation.some((value) => value === "");
    if (isEmpty) {
      // alert("Please fill in all inputs before updating.");
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Please fill in all inputs before updating!",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const updateData = days.map((day, index) => ({
      day: day,
      allocation: allocation[index],
      stopSell: stopSell[index] ? 1 : 0,
    }));
    console.log(updateData);
    // console.log(startDate);
    // console.log(endDate);
    // console.log(room);
    $.ajax({
      url: "https://beedesk.skyhms.in/skychnl/Store_inv_Bulk_update",
      type: "POST",
      data: {
        data: updateData,
        room: room,
        startDate: startDate,
        endDate: endDate,
      },
      dataType: "json",
      success: function (response) {
        // console.log(response);
        // setRows(response);
        // setLoading(false);
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
          if (e.scotartypetrnid === null) {
            unmappedRoom.push(e.roomtypeid);
          }
        });
        console.log(unmappedRoom);
        if (unmappedRoom === "") {
          // console.log('hi');
          setMap(0);
          // console.log(map);
          if (response.test !== "") {
            // console.log('test');
            setMap(1);
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
            // console.log(roomRows);
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
            // console.log(roomRows1);
            setHeader(roomRows1);
            // console.log(header);
            setLoading2(false);
          }
          setLoading1(false);
          setLoading2(false);
        } else {
          setMap(1);
          $.ajax({
            url: "https://beedesk.skyhms.in/skychnl/get_room_header",
            type: "POST",
            data: {
              unmappedRoom: unmappedRoom,
            },
            dataType: "json",
            success: function (response) {
              const roomRows = response.data.map((e) => ({
                id: e.roomtypeid,
                name: e.roomtypename,
              }));
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
              setHeader(roomRows1);
              setLoading2(false);
            },
          });
        }
      },
    });
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
    // console.log(keys);
    for (let i = 0; i < keys.length; i++) {
      // console.log('hi');
      if (updatedValues[keys[i]] === "") {
        test = 1;
        break;
      }
    }
    console.log(updatedValues);
    console.log(test);
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

  useEffect(() => {
    fetchRoomData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (loading1) {
    return <div>Loading1...</div>;
  }
  // if (loading3) {
  //   return <div>Loading...</div>;
  // }
  // if (unmappedRoom != "") {
  if (loading2) {
    return <div>Loading...</div>;
  }
  // }

  return (
    <>
      <div className="container1">
        <div className="header1">
          <h1>BULK UPDATE / INVENTORY</h1>
          <div className="search-group">
            <label>Rooms</label>
            <select value={room} onChange={handleChange}>
              <option value="0">Select</option>
              {rows.map((type) => (
                <option key={type.roomtypeid} value={type.roomtypeid}>
                  {type.roomtypename}
                </option>
              ))}
            </select>
          </div>
          {/* <button className="excel-btn">Excel Inventory Update</button> */}
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
        </div>
        {room !== 0 && (
          <div className="main-content1">
            <div className="inventory-section" style={{ width: "100%" }}>
              <div className="card">
                {/* <div className="card-header">
              <h2>Canyon Sun Hotel</h2>
              <button onClick={()=>{setForm(1)}} className="modify-btn">Modify Search</button>
            </div> */}

                <div className="card-content">
                  <div className="grid-container">
                    <div className="grid-row allocation">
                      <div className="grid-label">Allocation</div>
                      {days.map((day, index) => (
                        <div key={day} className="input-container">
                          <label htmlFor={`allocation-${index}`}>{day}</label>
                          <input
                            id={`allocation-${index}`}
                            type="number"
                            className="Bulk_inventory_input"
                            min="0"
                            value={allocation[index]}
                            onChange={(e) => {
                              const newAllocation = [...allocation];
                              newAllocation[index] = e.target.value;
                              setAllocation(newAllocation);
                            }}
                            onKeyDown={handleKeyPress}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid-row stop-sell">
                      <div className="grid-label">Stop Sell</div>
                      {days.map((day, index) => (
                        <div key={day} className="input-container">
                          <label htmlFor={`stop-sell-${index}`}>{day}</label>
                          <ToggleSwitch
                            id={`stop-sell-${index}`}
                            // type="checkbox"
                            checked={stopSell[index]}
                            onChange={(e) => {
                              const newStopSell = [...stopSell];
                              newStopSell[index] = e.target.checked;
                              setStopSell(newStopSell);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="action-buttons">
                    {/* <button className="cancel-btn">Cancel</button> */}
                    <button className="update-btn" onClick={handleUpdate}>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="room-types-section" >
          <div className="date-spans">
            <h2>DATE SPANS</h2>
            <p>13/12/2024 - 31/12/2024</p>
          </div>

          <div className="room-types">
            <h2>ROOM TYPES</h2>
            {roomTypes.map((platform, index) => (
              <div key={index} className="platform">
                <h3>{platform.platform}</h3>
                {platform.rooms.map((room, roomIndex) => (
                  <p key={roomIndex} className="room">
                    {room}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div> */}
          </div>
        )}
        {room === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              color: "#ff0000b5",
            }}
          >
            <h1>Please select Room type</h1>
          </div>
        )}
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
    </>
  );
};

export default HotelInventoryManager;
