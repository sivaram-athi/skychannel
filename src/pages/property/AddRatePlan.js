import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
// import InputAdornment from "@mui/material/InputAdornment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import $ from "jquery";
import Swal from "sweetalert2";
import axios from "axios";

const AddRatePlan = ({ setPlan, id, onRoomAdded }) => {
  // console.log(setRoom);
  const [name, setName] = useState("");
  const [meal, setMeal] = useState("");
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const [status, setstatus] = useState("");
  // const [minRate, setMinRate] = useState("");
  // const [maxRate, setMaxRate] = useState("");
  // const [extra, setExtra] = useState("");
  const [single, setSingle] = useState("");
  const [singleMin, setSingleMin] = useState("");
  const [singleMax, setSingleMax] = useState("");
  const [double, setDouble] = useState("");
  const [doubleMin, setDoubleMin] = useState("");
  const [doubleMax, setDoubleMax] = useState("");
  const [triple, setTriple] = useState("");
  const [tripleMin, setTripleMin] = useState("");
  const [tripleMax, setTripleMax] = useState("");
  // const [quad, setQuad] = useState("");
  // const [quadMin, setQuadMin] = useState("");
  // const [quadMax, setQuadMax] = useState("");
  const [extraChild, setExtraChild] = useState("");
  const [extraChildMin, setExtraChildMin] = useState("");
  const [extraChildMax, setExtraChildMax] = useState("");
  const [pax, setPax] = useState("");
  const [paxMin, setPaxMin] = useState("");
  const [paxMax, setPaxMax] = useState("");
  const [mealOptions, setMealOptions] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [channel, setChannel] = useState([]);

  useEffect(() => {
    $.ajax({
      url: "https://beedesk.skyhms.in/skychnl/getmeal",
      type: "POST",
      // data: { id: id },
      dataType: "json",
      success: function (response) {
        setMealOptions(response);
      },
    });
  }, []);
  // console.log('hi');

  useEffect(() => {
    $.ajax({
      url: "https://beedesk.skyhms.in/skychnl/getchannel",
      type: "POST",
        data: { id: id },
      dataType: "json",
      success: function (response) {
        // console.log(response);
        setChannel(response);
      },
    });
  }, []);

  const validateFields = () => {
    if (!name.trim()) return "Please enter the room name!";
    if (!meal || meal === "0") return "Please select a valid Meal Plan!";
    if (!status || status === "0") return "Please select a valid status!";
    if (!single.trim() || isNaN(single))
      return "Enter a valid Single Base Rate Plan!";
    if (!singleMin.trim() || isNaN(singleMin))
      return "Enter a valid Single Min Rate Plan!";
    if (!singleMax.trim() || isNaN(singleMax))
      return "Enter a valid Single Max Rate Plan!";
    if (!double.trim() || isNaN(double))
      return "Enter a valid Double Base Rate Plan!";
    if (!doubleMin.trim() || isNaN(doubleMin))
      return "Enter a valid Double Min Rate Plan!";
    if (!doubleMax.trim() || isNaN(doubleMax))
      return "Enter a valid Double Max Rate Plan!";
    if (!triple.trim() || isNaN(triple))
      return "Enter a valid Triple Base Rate Plan!";
    if (!tripleMin.trim() || isNaN(tripleMin))
      return "Enter a valid Triple Min Rate Plan!";
    if (!tripleMax.trim() || isNaN(tripleMax))
      return "Enter a valid Triple Max Rate Plan!";
    if (!extraChild.trim() || isNaN(extraChild))
      return "Enter a valid Extra Child Base Rate Plan!";
    if (!extraChildMin.trim() || isNaN(extraChildMin))
      return "Enter a valid Extra Child Min Rate Plan!";
    if (!extraChildMax.trim() || isNaN(extraChildMax))
      return "Enter a valid Extra Child Max Rate Plan!";
    if (!pax.trim() || isNaN(pax)) return "Enter a valid Pax Base Rate Plan!";
    if (!paxMin.trim() || isNaN(paxMin))
      return "Enter a valid Pax Min Rate Plan!";
    if (!paxMax.trim() || isNaN(paxMax))
      return "Enter a valid Pax Max Rate Plan!";
    return null;
  };

  const handleInputChange = (otaId, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [otaId]: value,
    }));
  };

  const result = channel.reduce((acc, e) => {
    acc[e.otaid] = inputValues[e.otaid] || "";
    return acc;
  }, {});

  const handleChange = () => {
    const errorMessage = validateFields();
    if (errorMessage) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: errorMessage,
      });
      return;
    }
    var data = {
      id: id,
      name: name,
      meal: meal,
      status: status,
      single: single,
      singleMin: singleMin,
      singleMax: singleMax,
      double: double,
      doubleMin: doubleMin,
      doubleMax: doubleMax,
      triple: triple,
      tripleMin: tripleMin,
      tripleMax: tripleMax,
      extraChild: extraChild,
      extraChildMin: extraChildMin,
      extraChildMax: extraChildMax,
      pax: pax,
      paxMin: paxMin,
      paxMax: paxMax,
      result:result,
    };
    axios({
      url: "https://beedesk.skyhms.in/skychnl/store_rate_plan",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    })
      .then((res) => {
        if (res.data.success === true) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Rate Plan Added successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
          setPlan(0);
          if (onRoomAdded) {
            onRoomAdded();
          }
        }
      })
      .catch((err) => {});
  };
  const handleChange1 = (event) => {
    setMeal(event.target.value);
  };
  const FormGroup = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    gap: 8px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;

      .MuiDemoContainer-root {
        width: 100%;
      }

      .MuiDateRangePickerDay-root {
        margin: 0;
      }
    }
  `;
  const Label = styled.label`
    color: #1f2937;
    font-size: 1rem;
    font-weight: bold;
    min-width: 120px;
    margin-right: 4%;

    @media (max-width: 768px) {
      min-width: unset;
      margin-bottom: 4px;
    }
  `;
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
        <h3 style={{ margin: "10px" }}>ADD A NEW RATE PLAN</h3>
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
              setPlan(0);
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
      <Box sx={{ flexGrow: 1 }}>
        <div
          style={{
            padding: "5px",
            background: "white",
            borderLeft: "4px solid #80c7f2",
            borderRadius: "6px",
            marginBottom: "12px",
            marginTop: "12px",
          }}
        >
          <p
            style={{
              margin: "0",
              padding: "5px",
              fontSize: "20px",
              fontFamily: "sans-serif",
            }}
          >
            Header
          </p>
        </div>
        <Grid container spacing={3} alignItems="center">
          <Grid size={1.5} item xs={12} sm={12}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Plan Name:
            </Typography>
          </Grid>
          <Grid size={2.5} sm={12} xs={12}>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              style={{ width: "100%" }}
              size="small"
            >
              <TextField
                id="outlined-basic"
                size="small"
                style={{ width: "100%" }}
                label="Rate Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          {/* <Grid size={1.}></Grid> */}
          <Grid item size={1} xs={12} sm={3}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Meal Type:
            </Typography>
          </Grid>
          <Grid size={3}>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              style={{ width: "72%" }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Meal Type</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={meal}
                label="Meal"
                onChange={handleChange1}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {mealOptions.map((e) => (
                  <MenuItem key={e.mealplanid} value={e.mealplanid}>
                    {e.mealplanname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={1}>
            <Label>Status:</Label>
          </Grid>
          <Grid size={3}>
            <FormGroup>
              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                style={{ width: "12%" }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">Status</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={status}
                  label="status"
                  onChange={(e) => setstatus(e.target.value)}
                >
                  <MenuItem value="0">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={2}>InActive</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>
          </Grid>
        </Grid>
        <div
          style={{
            padding: "5px",
            background: "white",
            borderLeft: "4px solid #80c7f2",
            borderRadius: "6px",
            marginBottom: "12px",
          }}
        >
          <p
            style={{
              margin: "0",
              padding: "5px",
              fontSize: "20px",
              fontFamily: "sans-serif",
            }}
          >
            Tarrif
          </p>
        </div>
        <TableContainer
          component={Paper}
          style={{
            marginBottom: "15px",
            width: "70%",
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
                  ></TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "#638faf",
                      color: "#FFF",
                      fontSize: "12px",
                      padding: "4px 12px",
                    }}
                  >
                    Base Rate
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "#638faf",
                      color: "#FFF",
                      fontSize: "12px",
                      padding: "4px 12px",
                    }}
                  >
                    Min Rate
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "#638faf",
                      color: "#FFF",
                      fontSize: "12px",
                      padding: "4px 12px",
                    }}
                  >
                    Max Rate
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ padding: "0px !important" }} align="center">
                    Single
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Single"
                        variant="outlined"
                        value={single}
                        onChange={(e) => setSingle(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Single"
                        variant="outlined"
                        value={singleMin}
                        onChange={(e) => setSingleMin(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Single"
                        variant="outlined"
                        value={singleMax}
                        onChange={(e) => setSingleMax(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ padding: "0px !important" }} align="center">
                    Double
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Double"
                        variant="outlined"
                        value={double}
                        Max
                        onChange={(e) => setDouble(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Double"
                        variant="outlined"
                        value={doubleMin}
                        onChange={(e) => setDoubleMin(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Double"
                        variant="outlined"
                        value={doubleMax}
                        onChange={(e) => setDoubleMax(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ padding: "0px !important" }} align="center">
                    Triple
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Triple"
                        variant="outlined"
                        value={triple}
                        onChange={(e) => setTriple(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Triple"
                        variant="outlined"
                        value={tripleMin}
                        Max
                        onChange={(e) => setTripleMin(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Triple"
                        variant="outlined"
                        value={tripleMax}
                        onChange={(e) => setTripleMax(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell sx={{ padding: "0px !important" }} align="center">
                    Quad
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Quad"
                        variant="outlined"
                        value={quad}
                        onChange={(e) => setQuad(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Quad"
                        variant="outlined"
                        value={quadMin}
                        onChange={(e) => setQuadMin(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Quad"
                        variant="outlined"
                        value={quadMax}
                        onChange={(e) => setQuadMax(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell sx={{ padding: "0px !important" }} align="center">
                    Extra Child
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Extra Child"
                        variant="outlined"
                        value={extraChild}
                        onChange={(e) => setExtraChild(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Extra Child"
                        variant="outlined"
                        value={extraChildMin}
                        onChange={(e) => setExtraChildMin(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Extra Child"
                        variant="outlined"
                        value={extraChildMax}
                        onChange={(e) => setExtraChildMax(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ padding: "0px !important" }} align="center">
                    Extra Pax
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Extra Pax"
                        variant="outlined"
                        value={pax}
                        onChange={(e) => setPax(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Extra Pax"
                        variant="outlined"
                        value={paxMin}
                        onChange={(e) => setPaxMin(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ padding: "0px !important", width: "50%" }}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ width: "60%", margin: "6px" }}
                      size="small"
                    >
                      <TextField
                        id="outlined-basic"
                        size="small"
                        style={{ width: "100%" }}
                        label="Extra Pax"
                        variant="outlined"
                        value={paxMax}
                        onChange={(e) => setPaxMax(e.target.value)}
                      />
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TableContainer>
        <div
          style={{
            padding: "5px",
            background: "white",
            borderLeft: "4px solid #80c7f2",
            borderRadius: "6px",
            marginBottom: "12px",
          }}
        >
          <p
            style={{
              margin: "0",
              padding: "5px",
              fontSize: "20px",
              fontFamily: "sans-serif",
            }}
          >
            Room Rate Mapping
          </p>
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
                    Rate Plan Code
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {channel.map((e) => (
                  <TableRow>
                    <TableCell sx={{ padding: "4px !important" }}>
                      {e.otaname}
                    </TableCell>
                    <TableCell
                      sx={{ padding: "4px !important" }}
                      align="center"
                    >
                      <TextField
                        id={e.otaid}
                        size="small"
                        className="ota's"
                        style={{ width: "40%" }}
                        // label="Plan Name"
                        variant="outlined"
                        onChange={(e) =>
                          handleInputChange(e.target.id, e.target.value)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      </Box>
    </>
  );
};

export default AddRatePlan;
