import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./WeeklyArrival.css";
import axios from "axios";

const WeeklyArrival = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chartSize, setChartSize] = useState({ width: 300, height: 300 });
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingChannels, setBookingChannels] = useState([]);

  useEffect(() => {
    setIsVisible(true);

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setChartSize({
        width: isMobile ? 250 : 300,
        height: isMobile ? 250 : 300,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    axios
      .get("https://beedesk.skyhms.in/skychnl/getWeeklyArrival")
      .then((res) => {
        const data = res.data.data.map((e) => ({
          name: e.roomtypename,
          value: parseFloat(e.value) || 0,
          color: getRandomColor(),
        }));
        setRooms(data);
        setLoading(false);
        const rawData = res.data.test.map((e) => ({
          name: e.otaname,
          bookings: parseInt(e.count),
          revenue: parseInt(e.total_revenue),
        }));
        
        const maxRevenue = Math.max(...rawData.map((item) => item.revenue));
        
        const data1 = rawData.map((item) => ({
          ...item,
          percentage: maxRevenue > 0 ? Math.round((item.revenue / maxRevenue) * 100) : 0,
        }));
        console.log("Processed booking channels data", data1);
        setBookingChannels(data1);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
  }, []);

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

<<<<<<< HEAD
    return `rgb(${r}, ${g}, ${b})`; 
=======
    return `rgb(${r}, ${g}, ${b})`;
>>>>>>> 1d15f40662ea1fe1ed587ff798aa7a09ff18a0b4
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{
          fontSize: window.innerWidth < 768 ? "10px" : "12px",
          fontWeight: 500,
        }}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`dashboard-container ${isVisible ? "visible" : ""}`}>
      {/* <h1 className="dashboard-title">Room Bookings Dashboard</h1> */}

      <div className="dashboard-grid">
        {/* Rooms Distribution Section */}
        <div className="card">
          <h2 className="card-title">Booked Room</h2>
          <div className="chart-container">
            {rooms.length > 0 ? (
              <PieChart width={chartSize.width} height={chartSize.height}>
                <Pie
                  data={rooms}
                  cx={chartSize.width / 2}
                  cy={chartSize.height / 2}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  innerRadius={chartSize.width * 0.2}
                  outerRadius={chartSize.width * 0.33}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {rooms.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      onMouseEnter={() => setSelectedRoom(entry)}
                      onMouseLeave={() => setSelectedRoom(null)}
                    />
                  ))}
                </Pie>
              </PieChart>
            ) : (
              <p>No data available</p>
            )}
          </div>

          <div className="legend-grid">
            {rooms.map((room) => (
              <div
                key={room.name}
                className="legend-item"
                onMouseEnter={() => setSelectedRoom(room)}
                onMouseLeave={() => setSelectedRoom(null)}
              >
                <div
                  className="legend-color"
                  style={{ backgroundColor: room.color }}
                />
                <span
                  className={`legend-text ${
                    selectedRoom?.name === room.name ? "selected" : ""
                  }`}
                >
                  {room.name}
                </span>
              </div>
            ))}
          </div>

          {selectedRoom && (
            <div className="selected-info">
              <p className="selected-info-title">{selectedRoom.name}</p>
              <p className="selected-info-value">
                Occupancy: {selectedRoom.value}
              </p>
            </div>
          )}
        </div>

        {/* Booking Channels Section */}
        <div className="card">
          <h2 className="card-title">Booking Channels</h2>
          <div className="channels-list">
            {bookingChannels.map((channel, index) => (
              <div
                key={channel.name}
                className={`channel-item ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="channel-header">
                  <span className="channel-name">{channel.name}</span>
                  <span className="channel-bookings">
                    {channel.bookings} bookings
                  </span>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar1"
                    style={{
                      width: `${channel.percentage}%`,
                      transform: isVisible ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </div>
                <div className="channel-revenue">
                  ₹{channel.revenue.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyArrival;
