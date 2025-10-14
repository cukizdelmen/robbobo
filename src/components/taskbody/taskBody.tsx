"use client";
import React, { useState } from "react";
import "./taskBody.css";
import { TbDotsVertical } from "react-icons/tb";

const Task = () => {
  const [status, setStatus] = useState("Pending");
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="taskContent">
      <div className="task" >
        <h3 onClick={toggleAccordion} className="taskName">Task Name</h3>

        <select
          name=""
          id=""
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={status === "Completed" ? "completed" : "Pending"}
        >
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
        <div className="delAction">
        <TbDotsVertical onClick={toggleDropdown}/>
        {isDropdownOpen &&
        <div className="delBox">
            Delete
        </div>
        }
        
        </div>
      </div>
      <div className={`accordion ${isAccordionOpen ? 'open' : ''}`}>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
          voluptates ex cumque laudantium enim distinctio?
        </p>
      </div>
    </div>
  );
};

export default Task;
