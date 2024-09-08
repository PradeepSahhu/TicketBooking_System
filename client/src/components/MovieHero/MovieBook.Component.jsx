import React, { useContext } from "react";
import PaymentModel from "../PaymentModal/Payment.Component";
import { MovieContext } from "../../context/Movie.context";
import { useNavigate } from "react-router-dom";
import { VscDebugContinue } from "react-icons/vsc";

const MovieName = ({ movie }) => {
  const navigate = useNavigate();

  const bookTicket = () => {
    // Here, you can pass the movie props to the "ticketbook" page using state
    navigate("/ticketbook", { state: { movie } });
  };

  const { price, setIsOpen, isOpen, rentMovie, buyMovie } =
    useContext(MovieContext);
  const genres = movie.genres?.map(({ name }) => name).join(", ");

  return (
    <>
      <PaymentModel setIsOpen={setIsOpen} isOpen={isOpen} price={price} />
      <div className="flex flex-col gap-8">
        <h1 className="text-white text-5xl font-bold">
          {movie.original_title}
        </h1>
        <div className="bg-transparent w-full ml-5">
          <div className="flex justify-center items-center">
            <div className="">
              <div className="flex justify-center">
                <p className="text-[5rem] text-white font-extrabold m-10">
                  Ticket Booking
                </p>
              </div>
              <div className="flex justify-center">
                <label
                  className="text-white text-xl font-bold mr-5"
                  for="selectPeople"
                >
                  People Count
                </label>
                <select
                  name="selectPeople"
                  className="w-1/2 justify-end focus:border-yellow-400 px-5 py-2 rounded-xl focus:outline-yellow-400"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                    <option value={item}>{item} People</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center text-white my-5">
                <button className="flex px-5 py-3 my-2 rounded-xl bg-blue-gray-700 group hover:scale-90 transition-all duration-300">
                  <VscDebugContinue className="text-2xl mr-2 group-hover:text-black" />
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieName;
