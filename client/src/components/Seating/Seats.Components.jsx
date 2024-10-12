import React, { useState } from "react";
import "../../index.css"; // Create this file for basic styling

const rows = 5; // Number of rows
const cols = 10; // Number of seats per row

const CinemaSeatSelection = () => {
  // Initial seat state: available (true) or reserved (false)
  const [seats, setSeats] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(true))
  );

  const [selectedSeats, setSelectedSeats] = useState([]);

  // Toggle seat selection
  const toggleSeatSelection = (row, col) => {
    const seatSelected = `${row}-${col}`;
    const isSelected = selectedSeats.includes(seatSelected);

    if (seats[row][col]) {
      setSelectedSeats((prev) =>
        isSelected
          ? prev.filter((seat) => seat !== seatSelected)
          : [...prev, seatSelected]
      );
    }
  };

  // Render seats
  const renderSeats = () => {
    return seats.map((rowSeats, rowIndex) => (
      <div className="row" key={rowIndex}>
        {rowSeats.map((isAvailable, seatIndex) => {
          const seatId = `${rowIndex}-${seatIndex}`;
          const isSelected = selectedSeats.includes(seatId);

          return (
            <div
              key={seatId}
              className={`seat ${isAvailable ? "" : "reserved"} ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => toggleSeatSelection(rowIndex, seatIndex)}
            >
              {seatIndex + 1}
            </div>
          );
        })}
      </div>
    ));
  };

  const renderleftSeats = () => {
    return seats.map((rowSeats, rowIndex) => (
      <div className="row" key={rowIndex}>
        {rowSeats.map((isAvailable, seatIndex) => {
          const seatId = `${rowIndex}-${seatIndex}`;
          const isSelected = selectedSeats.includes(seatId);

          return (
            <div
              key={seatId}
              className={`seat ${isAvailable ? "" : "reserved"} ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => toggleSeatSelection(rowIndex, seatIndex)}
            >
              {seatIndex + 1}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="cinema ">
      <h2>Select Your Seats</h2>
      <div className="grid grid-cols-3">
        <div className="cols-start-1 cols-end-1">{renderleftSeats()}</div>
        <div>{renderSeats()}</div>
        <div>{renderSeats()}</div>
      </div>

      <div className="selection-summary">
        <h3>
          Selected Seats:{" "}
          {selectedSeats.length === 0 ? "None" : selectedSeats.join(", ")}
        </h3>
      </div>
      <button className="m-5 bg-black text-md rounded-xl text-white px-5 py-3">
        Confirm Ticket
      </button>
    </div>
  );
};

export default CinemaSeatSelection;
