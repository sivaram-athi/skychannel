import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Paper,
  Typography,
  FormHelperText,
} from "@mui/material";
import $ from "jquery";
import Swal from "sweetalert2";

const AddChannels = ({ setChannel, onRoomAdded }) => {
  // Form state
  const [formData, setFormData] = useState({
    bearertoken: "",
    hotel_code: "",
    chnltoken: "",
    category: "",
    status: "1",
  });

  // Validation state
  const [errors, setErrors] = useState({
    bearertoken: "",
    chnltoken: "",
    hotel_code: "",
    category: "",
  });
  const [ota, setOta] = useState([]);
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  useEffect(() => {
    $.ajax({
      url: "https://beedesk.skyhms.in/skychnl/getota",
      type: "POST",
      // data: { id: id },
      dataType: "json",
      success: function (response) {
        setOta(response);
      },
    });
  }, []);

  // Validate form
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Channel name validation
    if (!formData.bearertoken.trim()) {
      tempErrors.bearertoken = "Bearer Token is required";
      isValid = false;
    }

    if (!formData.hotel_code.trim()) {
      tempErrors.hotel_code = "Hotel Code is required";
      isValid = false;
    }

    // Price validation
    if (!formData.chnltoken) {
      tempErrors.chnltoken = "Channel Token is required";
      isValid = false;
    }

    // Category validation
    if (!formData.category) {
      tempErrors.category = "Please select a category";
      isValid = false;
    }

    if (!formData.status) {
      tempErrors.status = "Please select a status";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle save
  const handleSave = () => {
    if (validateForm()) {
      console.log("Form data:", formData);
      $.ajax({
        url: "https://beedesk.skyhms.in/skychnl/storechannel",
        type: "POST",
        data: { formData: formData },
        dataType: "json",
        success: function (response) {
          // console.log(response.success);
          // setOta(response);
          if (response.success == false) {
            // console.log('hi');
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "OTA Already exist!",
              timer: 2000,
              showConfirmButton: false,
            });
          } else {
            // console.log('test');
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Channel Added successfully!",
              timer: 2000,
              showConfirmButton: false,
            });
            setChannel(0);
            if (onRoomAdded) {
              onRoomAdded();
            }
          }
        },
      });
    }
  };

  return (
    <Paper elevation={0} className="form-container">
      <Box
        sx={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 2px 0px 0px",
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          ADD CHANNEL
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            padding: "12px 0",
          }}
        >
          <Button
            variant="contained"
            onClick={() => setChannel(0)}
            sx={{
              backgroundColor: "#f5f5f5",
              color: "#666",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "#5DB996",
              "&:hover": {
                backgroundColor: "#4ca884",
              },
            }}
          >
            Save
          </Button>
        </Box>
      </Box>

      <Box sx={{ padding: "16px 24px" }}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  width: "130px",
                  fontWeight: "medium",
                  color: "#555",
                  pt: 1,
                }}
              >
                OTA'S *
              </Typography>
              <Box sx={{ width: "170px" }}>
                <FormControl fullWidth size="small" error={!!errors.category}>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    displayEmpty
                    sx={{
                      borderRadius: 1,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: errors.category
                          ? "#d32f2f"
                          : "rgba(0, 0, 0, 0.23)",
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      <em>Select a OTA</em>
                    </MenuItem>
                    {ota.map((e) => (
                      <MenuItem key={e.otaid} value={e.otaid}>
                        {e.otaname}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && (
                    <FormHelperText error>{errors.category}</FormHelperText>
                  )}
                </FormControl>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  width: "130px",
                  fontWeight: "medium",
                  color: "#555",
                  pt: 1,
                }}
              >
                Hotel Code
              </Typography>
              <TextField
                name="hotel_code"
                value={formData.hotel_code}
                onChange={handleChange}
                sx={{ width: "170px" }}
                placeholder="Enter Hotel Code"
                size="small"
                InputProps={{
                  sx: { borderRadius: 1 },
                }}
              />
              {errors.hotel_code && (
                <FormHelperText error>{errors.hotel_code}</FormHelperText>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  width: "130px",
                  fontWeight: "medium",
                  color: "#555",
                  pt: 1,
                }}
              >
                Status
              </Typography>
              <FormControl size="small" sx={{ width: "170px" }}>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  sx={{
                    borderRadius: 1,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                  }}
                >
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="2">Inactive</MenuItem>
                </Select>
                {errors.status && (
                  <FormHelperText error>{errors.status}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        {/* Second Row - 2 inputs */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  width: "130px",
                  fontWeight: "medium",
                  color: "#555",
                  pt: 1,
                }}
              >
                Bearer Token *
              </Typography>
              <Box sx={{ width: "450px" }}>
                <TextField
                  name="bearertoken"
                  value={formData.bearertoken}
                  onChange={handleChange}
                  placeholder="Enter Bearer Token"
                  size="small"
                  fullWidth
                  error={!!errors.bearertoken}
                  InputProps={{
                    sx: { borderRadius: 1 },
                  }}
                />
                {errors.bearertoken && (
                  <FormHelperText error>{errors.bearertoken}</FormHelperText>
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  width: "130px",
                  fontWeight: "medium",
                  color: "#555",
                  pt: 1,
                }}
              >
                Channel Token *
              </Typography>
              <Box sx={{ width: "450px" }}>
                <TextField
                  name="chnltoken"
                  value={formData.chnltoken}
                  onChange={handleChange}
                  placeholder="Enter Channel Token"
                  size="small"
                  fullWidth
                  error={!!errors.chnltoken}
                  InputProps={{
                    sx: { borderRadius: 1 },
                  }}
                />
                {errors.chnltoken && (
                  <FormHelperText error>{errors.chnltoken}</FormHelperText>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AddChannels;
