import React, { useState } from "react";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rate-accordion">
      <div
        className="accordion-header"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="accordion-arrow">{isOpen ? "▼" : "▶"}</span>
        {title}
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Accordion;
