import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
// import { Gauge } from "@mui/x-charts/Gauge";
// import ProgressBar from "./ProgressBar";
// import RoomTypeCard from "./RoomTypeCard";
// import { motion } from "framer-motion";
import "./TodaysArrival.css";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";

const TodaysArrival = () => {
  const [setGaugeValue] = useState(0);
  // const [roomTypes, setRoomTypes] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [channelData1, setChannelData1] = useState([]);
  const [selectedView, setSelectedView] = useState("booking");
  const [isVisible, setIsVisible] = useState(false);
  const [desktopOS, setDesktopOS] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const ModernBarChart = ({ data, title }) => {
    const [animatedWidths, setAnimatedWidths] = useState([]);

    useEffect(() => {
      const maxValue = Math.max(...data.map((item) => item.value));
      const widths = data.map((item) => (item.value / maxValue) * 100);

      // Animate the bars after component mounts
      const timer = setTimeout(() => {
        setAnimatedWidths(widths);
      }, 100);

      return () => clearTimeout(timer);
    }, [data]);

    return (
      <div className="modern-bar-chart">
        <h3 className="chart-title">{title}</h3>

        {data.map((item, index) => (
          <div key={index} className="bar-item">
            <div className="bar-item-header">
              <span className="bar-item-name">{item.name}</span>
              <span className="bar-item-value">{item.value}</span>
            </div>
            <div className="bar-container1">
              <div
                className="bar-fill"
                style={{
                  width: `${animatedWidths[index] || 0}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setGaugeValue(50);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    axios
      .get("https://beedesk.skyhms.in/skychnl/getTodaysArrival")
      .then((res) => {
        // console.log(res.data);
        const data = res.data.data.map((e) => ({
          label: e.roomtypename,
          value: e.value,
          // color: getRandomColor(),
        }));
        setDesktopOS(data);
        setLoading(false);
        const data1 = res.data.test.map((e) => ({
          name: e.otaname,
          value: parseInt(e.count),
          color: getRandomColor(),
        }));
        setChannelData(data1);

        const data2 = res.data.test.map((e) => ({
          name: e.otaname,
          value: parseInt(e.total_revenue),
          color: getRandomColor(),
        }));
        setChannelData1(data2);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
  }, []);

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`; 
  };

  const handleViewChange = (e) => {
    setSelectedView(e.target.value);
  };

  // const desktopOS = [
  //   {
  //     label: "Windows",
  //     value: 72.72,
  //   },
  //   {
  //     label: "OS X",
  //     value: 16.38,
  //   },
  //   {
  //     label: "Linux",
  //     value: 3.83,
  //   },
  //   {
  //     label: "Chrome OS",
  //     value: 2.42,
  //   },
  //   {
  //     label: "Other",
  //     value: 4.65,
  //   },
  // ];

  const valueFormatter = (item) => `${item.value}`;
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="todays-arrival">
      <Typography variant="h4" component="h1" className="title">
        Booked Rooms
      </Typography>
      <div className="dashboard-content1">
        <div
          className={`dashboard1 gauge-section ${isVisible ? "visible" : ""}`}
        >
          <div className="gauge-wrapper">
            <PieChart
              series={[
                {
                  data: desktopOS,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                  valueFormatter,
                },
              ]}
              height={200}
            />
          </div>
        </div>
        <div
          className={`dashboard1 progress-section ${
            isVisible ? "visible" : ""
          }`}
        >
          <div className="view-selector">
            <select
              value={selectedView}
              onChange={handleViewChange}
              className="channel-dropdown"
            >
              <option value="booking">Channel By Booking</option>
              <option value="revenue">Channel By Revenue</option>
            </select>
          </div>

          <div className="chart-wrapper">
            {selectedView === "booking" ? (
              <ModernBarChart data={channelData} title="Channel By Booking" />
            ) : (
              <ModernBarChart data={channelData1} title="Channel By Revenue" />
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default TodaysArrival;
