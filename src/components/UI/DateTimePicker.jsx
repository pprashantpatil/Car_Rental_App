// components/DateTimePicker.jsx
import React from "react";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/DateTimePicker.css"; // custom styling

const DateTimePicker = ({ selectedDateTime, onSave, onClose }) => {
  return (
    <motion.div
      className="datepicker-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="datepicker-container shadow rounded"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <div className="datepicker-header d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
          <h6 className="m-0">📅 Select Date & Time</h6>
          <button className="btn btn-sm btn-light" onClick={onClose}>
            <MdClose size={20} />
          </button>
        </div>

        <div className="p-3">
          <DatePicker
            selected={selectedDateTime}
            onChange={onSave}
            showTimeSelect
            dateFormat="Pp"
            className="form-control"
            inline
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DateTimePicker;
