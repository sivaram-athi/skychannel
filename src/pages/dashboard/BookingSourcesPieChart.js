import React, { useEffect, useState } from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import axios from "axios";

const BookingSourcesPieChart = () => {
  const [bookingSourcesData, setBookingSourcesData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("nights");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    fetchData();

    // Add window resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedMetric]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://beedesk.skyhms.in/skychnl/dashboard_ota_details"
      );
      const roomRows = response.data.data.map((e) => ({
        name: e.otaname,
        value: Number(
          selectedMetric === "nights" ? e.total_nights : e.total_revenue
        ),
      }));
      setBookingSourcesData(roomRows);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const generateColors = (count) => {
    return Array.from({ length: count }, (_, i) => `hsl(${(i * 360) / count}, 70%, 60%)`);
  };

  const COLORS = generateColors(bookingSourcesData.length);

  // Determine chart sizing based on window width
  const getChartProps = () => {
    if (windowWidth >= 1000 && windowWidth <= 1440) {
      return {
        outerRadius: 60,
        cx: "50%",
        cy: "50%",
        containerHeight: 200,
        legendLayout: "horizontal",
        legendAlign: "center",
        legendVerticalAlign: "bottom"
      };
    }
    if (windowWidth >= 0 && windowWidth <= 390) {
      return {
        outerRadius: 60,
        cx: "50%",
        cy: "50%",
        containerHeight: 200,
        legendLayout: "horizontal",
        legendAlign: "center",
        legendVerticalAlign: "bottom"
      };
    }
    return {
      outerRadius: 80,
      cx: "50%",
      cy: "50%",
      containerHeight: 250,
      legendLayout: "vertical",
      legendAlign: "right",
      legendVerticalAlign: "middle"
    };
  };

  const {
    outerRadius,
    cx,
    cy,
    containerHeight,
    legendLayout,
    legendAlign,
    legendVerticalAlign
  } = getChartProps();

  return (
    <div 
      className="booking-sources-chart" 
      style={{ 
        background: "white", 
        borderRadius: "8px", 
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
        padding: "20px", 
        height: "100%", 
        display: "flex", 
        flexDirection: "column" 
      }}
    >
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "10px" 
        }}
      >
        <h3 style={{ margin: 0, fontSize: "18px", color: "#333" }}>
          Booking Sources
        </h3>
        <select 
          value={selectedMetric} 
          onChange={(e) => setSelectedMetric(e.target.value)}
          style={{ 
            padding: "5px", 
            borderRadius: "4px", 
            border: "1px solid #ddd" 
          }}
        >
          <option value="nights">Nights</option>
          <option value="revenue">Revenue</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={containerHeight}>
        <PieChart>
          <Pie 
            data={bookingSourcesData} 
            cx={cx} 
            cy={cy} 
            labelLine={false} 
            outerRadius={outerRadius} 
            dataKey="value"
          >
            {bookingSourcesData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              background: "white", 
              border: "1px solid #ddd", 
              borderRadius: "4px" 
            }} 
          />
          <Legend 
            layout={legendLayout}
            verticalAlign={legendVerticalAlign}
            align={legendAlign}
            iconType="circle" 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingSourcesPieChart;