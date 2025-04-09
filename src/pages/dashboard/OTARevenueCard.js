import React, { useEffect, useState } from "react";
import axios from "axios";

const OTARevenueAdvancedTable = () => {
  const [sortConfig, setSortConfig] = useState({
    key: "total_revenue",
    direction: "desc",
  });

  const [otaData, setOtaData] = useState([]);

  // const otaData = [
  //   {
  //     name: "Booking.com",
  //     revenue: 5234,
  //     bookings: 78,
  //     color: "#0095ff",
  //     trend: "up",
  //   },
  //   {
  //     name: "Agoda",
  //     revenue: 3876,
  //     bookings: 52,
  //     color: "#00c292",
  //   },
  //   {
  //     name: "Make My Trip",
  //     revenue: 2645,
  //     bookings: 37,
  //     color: "#FFB136",
  //   },
  //   {
  //     name: "GOIBIBO",
  //     revenue: 1890,
  //     bookings: 25,
  //     color: "#E74A25",
  //   },
  // ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://beedesk.skyhms.in/skychnl/dashboard_ota_details"
      );
      setOtaData(response.data.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const sortedData = [...otaData].sort((a, b) => {
    if (sortConfig.key === "total_revenue") {
      return sortConfig.direction === "asc"
        ? a.total_revenue - b.total_revenue
        : b.total_revenue - a.total_revenue;
    }
    return 0;
  });

  const handleSort = () => {
    setSortConfig((prev) => ({
      key: "total_revenue",
      direction: prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return "▲";
      case "down":
        return "▼";
      case "stable":
        return "■";
      default:
        return "";
    }
  };

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;t
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h3
          style={{
            color: "#333",
            margin: 0,
          }}
        >
          OTA Metrics
        </h3>
        <button
          onClick={handleSort}
          style={{
            background: "none",
            border: "1px solid #e0e0e0",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Sort by Revenue {sortConfig.direction === "asc" ? "▲" : "▼"}
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0 10px",
          minWidth: "0",
        }}
      >
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={headerStyle}>OTA</th>
            <th style={headerStyle}>Revenue</th>
            <th style={headerStyle}>Nights</th>
            {/* <th style={headerStyle}>Avg Booking Value</th>
            <th style={headerStyle}>Trend</th> */}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((ota, index) => (
            <tr
              key={index}
              style={{
                background: "#f9f9f9",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <td style={cellStyle}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: getRandomColor(),
                      marginRight: "10px",
                    }}
                  ></div>
                  {ota.otaname}
                </div>
              </td>
              <td style={cellStyle}>
                ${ota.total_revenue.toLocaleString()}
                {/* <div style={{
                  fontSize: '0.8em',
                  color: '#666',
                  marginTop: '3px'
                }}>
                  {((ota.revenue / totalRevenue) * 100).toFixed(1)}%
                </div> */}
              </td>
              <td style={cellStyle}>{ota.total_nights}</td>
              {/* <td style={cellStyle}>${ota.details.avgBookingValue.toFixed(2)}</td>
              <td style={cellStyle}>
                <span style={{
                  color: ota.trend === 'up' ? 'green' : 
                         ota.trend === 'down' ? 'red' : 'gray'
                }}>
                  {getTrendIcon(ota.trend)}
                </span>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const headerStyle = {
  padding: "10px",
  textAlign: "left",
  color: "#666",
  fontWeight: "600",
  borderBottom: "2px solid #e0e0e0",
};

const cellStyle = {
  padding: "15px 10px",
  color: "#333",
  position: "relative",
};

export default OTARevenueAdvancedTable;
