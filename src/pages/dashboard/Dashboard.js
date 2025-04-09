// Dashboard.jsx
import React, { useRef, useState } from "react";
import "./Demo.css";

const Dashboard = () => {
  const tableContainerRef = useRef(null);
  const [startDate, setStartDate] = useState("2024-12-12");
  const [endDate, setEndDate] = useState("2024-12-18");
  const [currentDates, setCurrentDates] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("Canyon Sun Hotel");

  const bookings = [
    {
      bookingNo: "NH731883719255874",
      property: "Canyon Sun Hotel",
      channel: "MakeMyTrip",
      guestName: "Suranjan Haidar",
      occupants: 1,
      bookingDate: "2024-12-12",
      nts: 2,
    },
    {
      bookingNo: "NH762233716030050",
      property: "Canyon Sun Hotel",
      channel: "MakeMyTrip",
      guestName: "Naveedh Mohamed",
      occupants: 2,
      bookingDate: "2024-12-11",
      nts: 1,
    },
    {
      bookingNo: "NH731043717000404",
      property: "Canyon Sun Hotel",
      channel: "MakeMyTrip",
      guestName: "Karthikeyan ES",
      occupants: 2,
      bookingDate: "2024-12-11",
      nts: 1,
    },
    {
      bookingNo: "NH731043717112090",
      property: "Canyon Sun Hotel",
      channel: "MakeMyTrip",
      guestName: "Mohan Raj Reddy",
      occupants: 2,
      bookingDate: "2024-12-11",
      nts: 1,
    },
    {
      bookingNo: "0136905718",
      property: "Canyon Sun Hotel",
      channel: "GOIBIBO",
      guestName: "Rajendra Moorthi",
      occupants: 2,
      bookingDate: "2024-12-11",
      nts: 4,
    },
  ];

  const menuItems = [
    { title: "Quick Inventory Update", icon: "🏪", color: "#67c6d4" },
    { title: "Quick Rate Update", icon: "💰", color: "#ff8a8a" },
    { title: "Bulk Inventory Update", icon: "📦", color: "#5d9cec" },
    { title: "Bulk Rate Update", icon: "💵", color: "#ffb74d" },
    { title: "Booking Report", icon: "📊", color: "#9ccc65" },
    { title: "Activity Report", icon: "📈", color: "#78909c" },
  ];

  const roomTypes = [
    {
      name: "Canyon King",
      availability: [
        "0 avl",
        "0 avl",
        "0 avl",
        "0 avl",
        "1 avl",
        "1 avl",
        "1 avl",
      ],
    },
    {
      name: "Platinum Deluxe Room",
      availability: [
        "0 avl",
        "0 avl",
        "0 avl",
        "0 avl",
        "1 avl",
        "0 avl",
        "0 avl",
      ],
    },
    {
      name: "Platinum Room",
      availability: [
        "0 avl",
        "0 avl",
        "0 avl",
        "1 avl",
        "1 avl",
        "1 avl",
        "0 avl",
      ],
    },
  ];

  const generateDateRange = (start, end) => {
    const dates = [];
    const currentDate = new Date(start);
    const endDateTime = new Date(end);

    while (currentDate <= endDateTime) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    return date
      .toLocaleDateString("en-GB", options)
      .replace(/(\d+) (\w+) (\d+)/, "$1 $2, $3");
  };

  const handleSearch = () => {
    const dateRange = generateDateRange(startDate, endDate);
    setCurrentDates(dateRange);
  };

  const scroll = (direction) => {
    const container = tableContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      const targetScroll =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  // Initialize dates on component mount
  React.useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="dashboard">
      <h1>DASHBOARD</h1>

      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="menu-item1"
            style={{ backgroundColor: item.color }}
          >
            <span className="icon">{item.icon}</span>
            <span className="title">{item.title}</span>
          </button>
        ))}
      </div>

      <div className="content-card">
        <div className="toolbar">
          <div className="button-group">
            <button className="enquiries-btn">Check Enquiries (0)</button>
            <button className="hold-btn">Hold on Rooms (0)</button>
          </div>
          <button className="download-btn">⬇️</button>
        </div>

        <div className="date-selector">
          <select
            className="hotel-select"
            value={selectedHotel}
            onChange={(e) => setSelectedHotel(e.target.value)}
          >
            <option value="Canyon Sun Hotel">Canyon Sun Hotel</option>
            <option value="Mountain View Hotel">Mountain View Hotel</option>
          </select>
          <div className="date-range">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span>-</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <div className="table-container" ref={tableContainerRef}>
            <table>
              <thead>
                <tr>
                  <th className="sticky-column">Room Type</th>
                  {currentDates.map((date, index) => (
                    <th key={index}>{formatDate(date)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roomTypes.map((room, index) => (
                  <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                    <td style={{fontFamily:"sans-serif"}} className="sticky-column">{room.name}</td>
                    {room.availability
                      .slice(0, currentDates.length)
                      .map((avail, i) => (
                        <td style={{fontFamily:"sans-serif"}} key={i}>{avail}</td>
                      ))}
                  </tr>
                ))}
                <tr className="total-row">
                  <td  className="sticky-column">Total Rooms Bookable</td>
                  {[0, 0, 0, 1, 3, 2, 1]
                    .slice(0, currentDates.length)
                    .map((total, index) => (
                      <td style={{fontFamily:"sans-serif"}} key={index}>{total}</td>
                    ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button onClick={() => scroll("left")} className="scroll-btn">
              ←
            </button>
            <button onClick={() => scroll("right")} className="scroll-btn">
              →
            </button>
          </div>
        </div>
      </div>
      <div className="booking-stats" style={{ marginTop: "20px" }}>
        <div className="stat-card recent">
          <span className="number">5</span>
          Recent Bookings
        </div>
        <div className="stat-card today">
          <span className="number">0</span>
          Today Arrivals
        </div>
        <div className="stat-card weekly">
          <span className="number">6</span>
          Weekly Arrivals
        </div>
        <a href="#" className="view-all">
          View all bookings
        </a>
      </div>

      <div className="bookings-table">
        <table>
          <thead>
            <tr>
              <th>Booking No.</th>
              <th>Property</th>
              <th>Channel</th>
              <th>Guest Name</th>
              <th>Occupants</th>
              <th>Booking Date</th>
              <th>Nts #</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.bookingNo}>
                <td>
                  <a href="#" className="booking-link">
                    {booking.bookingNo}
                  </a>
                </td>
                <td>{booking.property}</td>
                <td>{booking.channel}</td>
                <td>{booking.guestName}</td>
                <td>
                  <span className="occupants">{booking.occupants} 👤</span>
                </td>
                <td>{booking.bookingDate}</td>
                <td>{booking.nts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
