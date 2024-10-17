// ************************************************ answers ********************************

import React, { useState, useContext } from "react";
import "../../index.css"; // Create this file for basic styling
import { MovieContext } from "../../context/Movie.context";
import PaymentModel from "../PaymentModal/Payment.Component";

const rows = 5; // Number of rows
const cols = 10; // Number of seats per row

const CinemaSeatSelection = () => {
  const { price, setIsOpen, isOpen, buyTickets } = useContext(MovieContext);

  const [seats, setSeats] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(true))
  );
  const [leftSeats, setLeftSeats] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(Math.floor(cols / 2)).fill(true)) // Half the number of seats on the left
  );
  const [rightSeats, setRightSeats] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(Math.floor(cols / 2)).fill(true)) // Half the number of seats on the right
  );

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsLeft, setSelectedSeatsLeft] = useState([]);
  const [selectedSeatsRight, setSelectedSeatsRight] = useState([]);

  // Toggle seat selection for center
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

  // Toggle seat selection for left
  const toggleSeatsSelectionLeft = (row, col) => {
    const selectedLeft = `L${row}-${col}`;
    const isSelected = selectedSeatsLeft.includes(selectedLeft);

    if (leftSeats[row][col]) {
      setSelectedSeatsLeft((prev) =>
        isSelected
          ? prev.filter((seat) => seat !== selectedLeft)
          : [...prev, selectedLeft]
      );
    }
  };

  // Toggle seat selection for right
  const toggleSeatSelectionRight = (row, col) => {
    const selectedRight = `R${row}-${col}`;
    const isSelected = selectedSeatsRight.includes(selectedRight);

    if (rightSeats[row][col]) {
      setSelectedSeatsRight((prev) =>
        isSelected
          ? prev.filter((seat) => seat !== selectedRight)
          : [...prev, selectedRight]
      );
    }
  };

  // Render center seats
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

  // Render left section seats
  const renderLeftSeats = () => {
    return leftSeats.map((rowSeats, rowIndex) => (
      <div className="row" key={rowIndex}>
        {rowSeats.map((isAvailable, seatIndex) => {
          const seatId = `L${rowIndex}-${seatIndex}`;
          const isSelected = selectedSeatsLeft.includes(seatId);

          return (
            <div
              key={seatId}
              className={`seat ${isAvailable ? "" : "reserved"} ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => toggleSeatsSelectionLeft(rowIndex, seatIndex)}
            >
              {seatIndex + 1}
            </div>
          );
        })}
      </div>
    ));
  };

  // Render right section seats
  const renderRightSeats = () => {
    return rightSeats.map((rowSeats, rowIndex) => (
      <div className="row" key={rowIndex}>
        {rowSeats.map((isAvailable, seatIndex) => {
          const seatId = `R${rowIndex}-${seatIndex}`;
          const isSelected = selectedSeatsRight.includes(seatId);

          return (
            <div
              key={seatId}
              className={`seat ${isAvailable ? "" : "reserved"} ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => toggleSeatSelectionRight(rowIndex, seatIndex)}
            >
              {seatIndex + 1}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="cinema">
      <PaymentModel setIsOpen={setIsOpen} isOpen={isOpen} price={price} />
      <h2>Select Your Seats</h2>
      <div className="grid grid-cols-3">
        {/* Left section seats */}
        <div className="cols-start-1 cols-end-1">{renderLeftSeats()}</div>

        {/* Center section seats */}
        <div>{renderSeats()}</div>

        {/* Right section seats */}
        <div>{renderRightSeats()}</div>
      </div>

      <div className="selection-summary">
        <h3>
          Selected Seats:{" "}
          {selectedSeats.length === 0 ? "None" : selectedSeats.join(", ")}
        </h3>
        <h3>
          Selected Left Seats:{" "}
          {selectedSeatsLeft.length === 0
            ? "None"
            : selectedSeatsLeft.join(", ")}
        </h3>
        <h3>
          Selected Right Seats:{" "}
          {selectedSeatsRight.length === 0
            ? "None"
            : selectedSeatsRight.join(", ")}
        </h3>
      </div>
      <button
        className="m-5 bg-black text-md rounded-xl text-white px-5 py-3"
        onClick={() =>
          buyTickets(
            320 *
              (selectedSeats.length +
                selectedSeatsLeft.length +
                selectedSeatsRight.length)
          )
        }
      >
        Confirm Ticket
      </button>
    </div>
  );
};

export default CinemaSeatSelection;
