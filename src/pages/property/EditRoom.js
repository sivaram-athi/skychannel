import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import axios from "axios";
import Tabtwo from "./Tabtwo";
import $ from "jquery";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

const Title = styled.h1`
  margin: 0;
  color: #1f2937;
  font-size: 16px;
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 480px) {
    justify-content: stretch;

    button {
      flex: 1;
    }
  }
`;

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;

  &.cancel {
    background: #f3f4f6;
    color: #4b5563;
  }

  &.save {
    background: #10b981;
    color: white;
  }
`;

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
  font-size: 13px;
  min-width: 120px;

  @media (max-width: 768px) {
    min-width: unset;
    margin-bottom: 4px;
  }
`;

const Input = styled.input`
  flex: 0;
  padding: 4px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 13px;
  color: #1f2937;
  height: 28px;

  &:focus {
    outline: none;
    border-color: #10b981;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const OccupancySection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const OccupancyGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ShortInput = styled(Input)`
  max-width: 120px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const AddRoom = ({ setEdit, onRoomAdded, id }) => {
  const [ids, setIds] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [baseocc, setBaseocc] = useState("");
  const [maxocc, setMaxocc] = useState("");
  const [baseinv, setBaseinv] = useState("");
  const [extra, setExtra] = useState("");
  //   console.log(id);
  useEffect(() => {
    // axios({
    //   url: "https://beedesk.skyhms.in/skychnl/editroom",
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     id: id,
    //   },
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    $.ajax({
      url: "https://beedesk.skyhms.in/skychnl/editroom",
      type: "POST",
      data: {
        id: id,
      },
      dataType: "json",
      success: function (response) {
        setName(response.roomtypename);
        setBaseocc(response.baseoccupancy);
        setMaxocc(response.maxoccupancy);
        setBaseinv(response.baseinventory);
        setExtra(response.extrachild);
        setIds(response.roomtypeid);
        setStatus(response.status);
      },
    });
  }, [id]);
  const validateFields = () => {
    if (!name.trim()) return "Please enter the room name!";
    if (!baseocc.trim() || isNaN(baseocc) || baseocc <= 0)
      return "Enter a valid base occupancy!";
    if (!maxocc.trim() || isNaN(maxocc) || maxocc <= 0)
      return "Enter a valid max occupancy!";
    if (!baseinv.trim() || isNaN(baseinv) || baseinv <= 0)
      return "Enter a valid base inventory!";
    if (!status || status === "0") return "Please select a valid status!";
    if (!extra.trim()) return "Please enter extra details!";
    return null;
  };

  const handleSubmit = () => {
    const errorMessage = validateFields();
    if (errorMessage) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: errorMessage,
      });
      return;
    }

    let formData = new FormData();
    formData.append("name", name);
    formData.append("status", status);
    formData.append("baseocc", baseocc);
    formData.append("maxocc", maxocc);
    formData.append("baseinv", baseinv);
    formData.append("extra", extra);
    formData.append("id", ids);

    axios({
      url: "https://beedesk.skyhms.in/skychnl/updateRoom",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        if (res.data.success == true) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Room Updated successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
          setEdit(0);
          if (onRoomAdded) {
            onRoomAdded();
          }
        }
      })
      .catch((err) => {});
  };

  return (
    <Container>
      <Header>
        <Title>ADD A NEW ROOM</Title>
        <ButtonGroup>
          <Button className="cancel" onClick={() => setEdit(0)}>
            Cancel
          </Button>
          <Button className="save" onClick={handleSubmit}>
            Save
          </Button>
        </ButtonGroup>
      </Header>

      <FormGroup>
        <OccupancySection>
          <OccupancyGroup>
            <Label>Room Name:</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </OccupancyGroup>
          <OccupancyGroup>
            <Label>Base Inventory:</Label>
            <ShortInput
              type="text"
              value={baseinv}
              onChange={(e) => setBaseinv(e.target.value)}
            />
          </OccupancyGroup>
        </OccupancySection>
      </FormGroup>

      <FormGroup>
        <OccupancySection>
          <OccupancyGroup>
            <Label>Base Occupancy:</Label>
            <ShortInput
              type="text"
              value={baseocc}
              onChange={(e) => setBaseocc(e.target.value)}
            />
          </OccupancyGroup>
          <OccupancyGroup>
            <Label>Max Occupancy:</Label>
            <ShortInput
              type="text"
              value={maxocc}
              onChange={(e) => setMaxocc(e.target.value)}
            />
          </OccupancyGroup>
          <OccupancyGroup>
            <Label>No. of Extra Child:</Label>
            <ShortInput
              type="text"
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
            />
          </OccupancyGroup>
        </OccupancySection>
      </FormGroup>

      <FormGroup>
        <Label>Status:</Label>
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
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="0">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Active</MenuItem>
            <MenuItem value={2}>InActive</MenuItem>
          </Select>
        </FormControl>
        {/* </Grid> */}
      </FormGroup>
    </Container>
  );
};

export default AddRoom;
