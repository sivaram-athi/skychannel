import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskProgress = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [progressTasks, setProgressTasks] = useState([]);
  //   const progressTasks = [25, 30, 40, 50, 45, 55, 50, 30, 20, 35, 40, 45];
  const progressMonths = [
    "J",
    "F",
    "M",
    "A",
    "M",
    "J",
    "J",
    "A",
    "S",
    "O",
    "N",
    "D",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://beedesk.skyhms.in/skychnl/getprogressData"
      );
      //   setOtaData(response.data.data);
      const progressData = response.data.map((item) =>
        Number(item.total_room_nights)
      );

      setProgressTasks(progressData);

    //   console.log(progressData, "progressData");
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <>
      <div className="task-progress">
        <h3>Task Progress</h3>
        <div className="progress-chart">
          <div className="bar-container">
            {progressTasks.map((height, index) => (
              <div
                key={index}
                className={`prog-bar ${
                  index < 6 ? "urgent-bar" : "normal-bar"
                }`}
                style={{
                  height: `${height}%`,
                  marginTop: "auto",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index && (
                  <span className="progress-hover-tooltip">{height}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="months-footer">
          {progressMonths.map((month, index) => (
            <span key={index} className="month-label">
              {month}
            </span>
          ))}
        </div>
        <div className="task-counts">
          <div className="task-count urgent">
            <span className="count">05</span>
            <span className="label">Past Booking</span>
          </div>
          <div className="task-count normal">
            <span className="count">03</span>
            <span className="label">Future Booking</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskProgress;
