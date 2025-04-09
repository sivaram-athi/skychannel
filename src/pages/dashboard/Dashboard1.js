import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import DashboardTable from "./DashboardTable";
import BookingSourcesPieChart from "./BookingSourcesPieChart";
import OTARevenueCard from "./OTARevenueCard";
import TaskProgress from "./TaskProgress";

const Dashboard = () => {
  const [bookingCount, setBookingCount] = useState();
  const [currentNights, setCurrentNights] = useState();
  const [currentRevenue, setCurrentRevenue] = useState();
  const [totalRevenue, setTotalRevenue] = useState();
  const [activeOta, setActiveOta] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://beedesk.skyhms.in/skychnl/dashboard_ota_details"
      );
      setBookingCount(response.data.booking_count.count);
      setCurrentNights(response.data.current_month_details[0].total_nights);
      setCurrentRevenue(response.data.current_month_details[0].total_revenue);
      setTotalRevenue(response.data.total_revenue[0].total_revenue);
      setActiveOta(response.data.active_ota[0].active_ota);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dash-container">
      {/* Top Stats */}
      <div className="statistic-container">
        <div className="statistic-card" style={{ background: "#FFB136" }}>
          <div className="statistic-icon blue" style={{ background: "#FFF" }}>
            <i className="icon-dollar" style={{ color: "#000" }}></i>
          </div>
          <div className="statistic-content">
            <span className="statistic-value" style={{ fontSize: "large" }}>
              Current Month{" "}
            </span>
            {/* <span className="statistic-label">EARNING</span> */}
            <div className="statistic-footer">
              <span style={{ color: "white" }}>Nights:</span>
              <span className="statistic-text">{currentNights}</span>
            </div>
            <div className="statistic-footer">
              <span style={{ color: "white" }}>Revenue:</span>
              <span className="statistic-text">{currentRevenue}</span>
            </div>
          </div>
        </div>

        <div className="statistic-card" style={{ background: "#0283CC" }}>
          <div className="statistic-icon blue">
            <i className="iconic-check"></i>
          </div>
          <div className="statistic-content">
            <span className="statistic-value">{bookingCount}</span>
            <span className="statistic-label">FUTURE BOOKINGS</span>
            <div className="statistic-footer">
              <span style={{ color: "white" }}>Target</span>
              <span className="stat-badge green">200</span>
            </div>
          </div>
        </div>

        <div className="statistic-card" style={{ background: "#E74A25" }}>
          <div className="statistic-icon blue">
            <i className="icon-dollar"></i>
          </div>
          <div className="statistic-content">
            <span className="statistic-value">${totalRevenue}</span>
            <span className="statistic-label">TOTAL EARNINGS</span>
            {/* <div className="statistic-footer">
              <span style={{ color: "white" }}>March:</span>
              <span className="statistic-text">$514578</span>
            </div> */}
          </div>
        </div>

        <div className="statistic-card" style={{ background: "#2ECC71" }}>
          <div className="statistic-icon dark-blue">
            <i className="icon-comment"></i>
          </div>
          <div className="statistic-content">
            <span className="statistic-value">{activeOta}</span>
            <span className="statistic-label">ACTIVE OTA'S</span>
            {/* <div className="statistic-footer">
              <span style={{ color: "white" }}>Total Pending</span>
              <span className="stat-badge blue">154</span>
            </div> */}
          </div>
        </div>

        {/* <div className="statistic-card" style={{ background: "#FFB136" }}>
          <div className="statistic-content">
            <div className="report-container">
              <div className="report-chart">
                <svg viewBox="0 0 100 100" width="80" height="80">
                  <path
                    d="M 50,50 L 50,5 A 45,45 0 0,1 93.3,72.5 z"
                    fill="#0095ff"
                  />
                  <path
                    d="M 50,50 L 93.3,72.5 A 45,45 0 0,1 27.5,93.3 z"
                    fill="#67d8ef"
                  />
                  <path
                    d="M 50,50 L 27.5,93.3 A 45,45 0 0,1 5,50 z"
                    fill="#00c292"
                  />
                  <path
                    d="M 50,50 L 5,50 A 45,45 0 0,1 50,5 z"
                    fill="#cceeff"
                  />
                  <circle cx="50" cy="50" r="25" fill="#FFB136" />
                  <path
                    d="M 50,50 L 50,5 A 15,15 0 0,0 35,20 L 50,20 z"
                    fill="#FFB136"
                  />
                </svg>
              </div>
              <div className="report-info">
                <h3 className="report-title">Report</h3>
                <div className="report-legend">
                  <div className="legend-item">
                    <span className="dotting blue"></span>
                    <span>60% Earnings</span>
                  </div>
                  <div className="legend-item">
                    <span className="dotting light-blue"></span>
                    <span>55% Pending</span>
                  </div>
                  <div className="legend-item">
                    <span className="dotting green"></span>
                    <span>50% Bookings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="user-data-section">
        <div className="section-header">
          <h3>Table Format/User Data</h3>
        </div>
        <div className="table-container">
          <DashboardTable />
        </div>
      </div>

      {/* Middle Section */}
      <div className="middle-section">
        <BookingSourcesPieChart />
        <OTARevenueCard />
        <TaskProgress />
      </div>

      {/* Smaller Charts Section */}
      {/* <div className="small-charts-container">
        <div className="small-chart revenue">
          <div className="chart-value">${totalRevenue}</div>
          <div className="chart-label">REVENUE</div>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={revenueData}>
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#ffffff"
                strokeWidth={2}
                dotting={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="small-chart visits">
          <div className="chart-value">{totalVisits}</div>
          <div className="chart-label">CURRENT VISITS</div>
          <div className="chart-change">+25% LAST WEEK</div>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={visitsData}>
              <Bar dataKey="visits" fill="#ffffff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="small-chart tasks">
          <div className="chart-value">{finishedTasksPercent}%</div>
          <div className="chart-label">FINISHED TASKS</div>
          <div className="chart-change">+15% LAST WEEK</div>
          <div className="circular-progress">
            <svg>
              <circle className="circle-bg" cx="60" cy="60" r="50"></circle>
              <circle
                className="circle-progress"
                cx="60"
                cy="60"
                r="50"
                style={{
                  strokeDasharray: `${2 * Math.PI * 50}`,
                  strokeDashoffset: `${
                    2 * Math.PI * 50 * (1 - finishedTasksPercent / 100)
                  }`,
                }}
              ></circle>
            </svg>
          </div>
        </div>
      </div> */}

      {/* User Data Table */}
    </div>
  );
};

export default Dashboard;
