import React from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import $ from "jquery";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AddRoomChannel = ({ setChannel, id, onRoomAdded }) => {
  const [channels, setChannels] = useState([]);
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    $.ajax({
      url: "https://beedesk.skyhms.in/skychnl/getchannelroomcode",
      type: "POST",
      data: { id: id },
      dataType: "json",
      success: function (response) {
        var data = transformData(response);
        setChannels(data);

        // Initialize inputValues with existing otaroomtypecode values
        const initialInputValues = {};
        data.forEach((channel) => {
          channel.values.forEach((value) => {
            // Use a compound key that includes both channel ID and scotartypetrnid
            const uniqueKey = `${channel.id}_${value.scotartypetrnid}`;
            initialInputValues[uniqueKey] = value.otaroomtypecode || "";
          });
        });
        setInputValues(initialInputValues);
      },
    });
  }, []);

  const transformData = (data) => {
    const transformed = data.reduce((acc, item) => {
      const scroomtypeid = item.scroomtypeid;
      const otaroomtypecode = item.otaroomtypecode;
      const id = item.id;
      const otaname = item.otaname;
      const otaid = item.otaid;
      const scotartypetrnid = item.scotartypetrnid;

      if (!acc[id]) {
        acc[id] = {
          id: id,
          name: otaname,
          scroomtypeid: scroomtypeid,
          values: [],
        };
      }

      acc[id].values.push({
        otaroomtypecode,
        otaid,
        scotartypetrnid,
      });

      return acc;
    }, {});

    return Object.values(transformed);
  };

  const handleRateInputChange = (channelId, scotartypetrnid, value) => {
    // Create a unique key combining channel ID and scotartypetrnid
    const uniqueKey = `${channelId}_${scotartypetrnid}`;

    // Only update the specific input that was changed using the unique key
    setInputValues((prevValues) => ({
      ...prevValues,
      [uniqueKey]: value,
    }));
  };

  const handleChange = () => {
    // For saving, use the inputValues state with unique keys
    const updatedChannels = channels.map((channel) => ({
      ...channel,
      values: channel.values.map((value) => {
        const uniqueKey = `${channel.id}_${value.scotartypetrnid}`;
        return {
          ...value,
          otaroomtypecode:
            inputValues[uniqueKey] !== undefined
              ? inputValues[uniqueKey]
              : value.otaroomtypecode || "",
        };
      }),
    }));

    console.log("Updated Channels: ", updatedChannels);

    axios({
      url: "https://beedesk.skyhms.in/skychnl/store_room_code",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        updatedChannels: updatedChannels,
        id: id,
      },
    })
      .then((res) => {
        if (res.data.success == true) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Rate Plan Added successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
          setChannel(0);
          if (onRoomAdded) {
            onRoomAdded();
          }
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <div
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 2px 0px 0px",
          marginBottom: "5px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ margin: "10px" }}>CHANNEL</h3>
        <div
          style={{
            display: "flex",
            width: "20%",
            justifyContent: "space-around",
          }}
          className="save"
        >
          <Button
            variant="contained"
            onClick={() => {
              setChannel(0);
            }}
            style={{
              height: "30px",
              marginTop: "5px",
              backgroundColor: "#ddd",
              color: "#000000ad",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{
              height: "30px",
              marginTop: "5px",
              backgroundColor: "#5DB996",
            }}
            onClick={handleChange}
          >
            Save
          </Button>
        </div>
      </div>
      <TableContainer
        component={Paper}
        style={{
          marginBottom: "15px",
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#638faf",
                    color: "#FFF",
                    fontSize: "12px",
                    padding: "4px 12px",
                  }}
                >
                  OTA Name
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#638faf",
                    color: "#FFF",
                    fontSize: "12px",
                    padding: "4px 12px",
                    textAlign: "center",
                  }}
                >
                  Room Type Code
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {channels.map((channel) => (
                <TableRow key={channel.id}>
                  <TableCell sx={{ padding: "4px !important" }}>
                    {channel.name}
                  </TableCell>

                  <TableCell sx={{ padding: "4px !important" }} align="center">
                    {channel.values.map((value, index) => {
                      const uniqueKey = `${channel.id}_${value.scotartypetrnid}`;
                      return (
                        <TextField
                          key={index}
                          id={uniqueKey}
                          size="small"
                          className="ota-input"
                          style={{ width: "40%" }}
                          variant="outlined"
                          value={
                            inputValues[uniqueKey] !== undefined
                              ? inputValues[uniqueKey]
                              : value.otaroomtypecode || ""
                          }
                          onChange={(e) =>
                            handleRateInputChange(
                              channel.id,
                              value.scotartypetrnid,
                              e.target.value
                            )
                          }
                        />
                      );
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
    </>
  );
};

export default AddRoomChannel;
