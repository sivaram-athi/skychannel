import React, { useState } from "react";
import "./Calendar.css";

const MultiMonthCalendar = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const generateMonthData = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getMonthName = (month) => {
    return new Date(2000, month, 1).toLocaleString("default", {
      month: "long",
    });
  };

  const generateCalendarData = () => {
    const today = new Date();
    const months = [];

    for (let i = 0; i < 6; i++) {
      const currentDate = new Date(
        today.getFullYear(),
        today.getMonth() + i,
        1
      );
      months.push({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        days: generateMonthData(
          currentDate.getFullYear(),
          currentDate.getMonth()
        ),
      });
    }

    return months;
  };

  const handleDateClick = (year, month, day) => {
    if (day) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split("T")[0]; // Format date for comparison
      setSelectedDates((prev) =>
        prev.includes(dateString)
          ? prev.filter((d) => d !== dateString) // Remove date if already selected
          : [...prev, dateString] // Add date if not selected
      );
    }
  };

  const isToday = (year, month, day) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const isSelected = (year, month, day) => {
    const dateString = new Date(year, month, day).toISOString().split("T")[0];
    return selectedDates.includes(dateString);
  };

  const months = generateCalendarData();

  return (
    <div className="calendar-container">
      <div className="months-grid">
        {months.map(({ year, month, days }) => (
          <div key={`${year}-${month}`} className="month-card">
            <h2 className="month-title">
              {getMonthName(month)} {year}
            </h2>
            <div className="calendar-grid">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="weekday-header">
                  {day}
                </div>
              ))}
              {days.map((day, index) => (
                <div
                  key={index}
                  onClick={() => handleDateClick(year, month, day)}
                  className={`calendar-cell ${day ? "has-date" : ""} 
                    ${isToday(year, month, day) ? "today" : ""} 
                    ${day && isSelected(year, month, day) ? "selected" : ""}`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiMonthCalendar;
