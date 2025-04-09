import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Recent_booking.css";

const Recent_booking = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [statItems, setStatItems] = useState([]);
  const [totalBooking, setTotalBooking] = useState(0);
  const [channelData, setChannelData] = useState([]);
  const [channelData1, setChannelData1] = useState([]);
  const [selectedView, setSelectedView] = useState("booking"); // "booking" or "revenue"

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    axios
      .get("https://beedesk.skyhms.in/skychnl/getRecentBooking")
      .then((res) => {
        const res_status = res.data.data[0].res_status;
        const res_status1 = res.data.data[0].res_status1;
        const total = res.data.data[0].total;
        
        const statItems = [
          { label: "Cancelled", value: res_status1, color: "#2d324d" },
          { label: "Confirmed", value: res_status, color: "#6bd0db" },
        ];
        setStatItems(statItems);
        const SetValue = Math.round((res_status / total) * 100);
        setTotalBooking(Number(SetValue));
        
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

  // Modern circular progress indicator
  const CircularProgressIndicator = ({ percentage }) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setAnimatedValue(percentage);
      }, 100);
      return () => clearTimeout(timer);
    }, [percentage]);
    
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedValue / 100) * circumference;
    
    return (
      <div className="modern-chart-container">
        <svg className="circular-chart" viewBox="0 0 200 200">
          {/* Decorative background circles */}
          <circle cx="100" cy="100" r="85" fill="#f8f9fa" />
          <circle cx="100" cy="100" r="75" fill="#fff" />
          
          {/* Track Circle */}
          <circle
            className="circle-track"
            cx="100"
            cy="100"
            r={radius}
            strokeWidth="12"
            stroke="#6bd0db"
            fill="transparent"
          />
          
          {/* Progress Circle */}
          <circle
            className="circle-progress"
            cx="100"
            cy="100"
            r={radius}
            strokeWidth="12"
            stroke="#6bd0db"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 100 100)"
          />
          
          {/* Percentage Text */}
          <text
            x="100"
            y="95"
            className="chart-percentage"
            textAnchor="middle"
            fontSize="32"
            fontWeight="700"
          >
            {Math.round(animatedValue)}%
          </text>
          
          <text
            x="100"
            y="120"
            className="chart-label"
            textAnchor="middle"
            fontSize="14"
            fill="#888"
          >
            Confirmed
          </text>
        </svg>
      </div>
    );
  };

  // Modern bar chart
  const ModernBarChart = ({ data, title }) => {
    const [animatedWidths, setAnimatedWidths] = useState([]);
  
    useEffect(() => {
      const maxValue = Math.max(...data.map(item => item.value));
      const widths = data.map(item => (item.value / maxValue) * 100);
      
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

  const handleViewChange = (e) => {
    setSelectedView(e.target.value);
  };

  return (
    <>
      <div >
        <h1 className="dashboard-title1">Total Bookings</h1>
        <div className="dashboard-content1">
          <div className={`dashboard1 gauge-section ${isVisible ? "visible" : ""}`}>
            <div className="gauge-wrapper">
              <CircularProgressIndicator percentage={totalBooking} />
              <div className="stats-container">
                {statItems.map((item, index) => (
                  <div
                    key={index}
                    className="stat-item"
                    style={{ borderLeftColor: item.color }}
                  >
                    <h4>
                      {item.label}
                      <br />
                      {item.value}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`dashboard1 progress-section ${isVisible ? "visible" : ""}`}>
            <div className="view-selector">
              <select value={selectedView} onChange={handleViewChange} className="channel-dropdown">
                <option value="booking">Channel By Booking</option>
                <option value="revenue">Channel By Revenue</option>
              </select>
            </div>
            
            <div className="chart-wrapper">
              {selectedView === "booking" ? (
                <ModernBarChart 
                  data={channelData} 
                  title="Channel By Booking"
                />
              ) : (
                <ModernBarChart 
                  data={channelData1} 
                  title="Channel By Revenue"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recent_booking;