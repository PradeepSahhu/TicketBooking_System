import React from "react";
import { useLocation } from "react-router-dom";
import { VscDebugContinue } from "react-icons/vsc";
// import MovieInfo from "./MovieInfo.Component";
import MovieName from "../components/MovieHero/MovieBook.Component";
function BookTicket() {
  const location = useLocation();
  console.log("location : ", location);
  // const { movie, rentMovie, buyMovie } = useContext(MovieContext);

  const movie = location.state?.movie || null;
  const genres = movie.genres?.map(({ name }) => name).join(", ");
  if (!movie) {
    return <div>No movie information available.</div>;
  }

  return (
    <div>
      <div className="min-w-full bg-darkBackground-700 py-3 text-white px-5 flex flex-row justify-between items-start">
        <div>
          <h1 className="text-[18px] font-medium">{movie.original_title}</h1>
          <div className="flex  flex-col gap-2 text-white">
            <h4 className="text-[14px]">4k rating</h4>
            <h4 className="text-[12px]">
              {movie.runtime} min | {genres}
            </h4>
          </div>
        </div>

        <div>
          <button className="px-6 py-[6px] border border-gray-600 rounded-sm text-[14px]">
            2 Tickets
          </button>
        </div>
      </div>
      <div
        className="relative hidden w-full lg:block"
        style={{ height: "30rem" }}
      >
        <div
          className="absolute z-10 w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(34, 34, 34) 14.95%, rgba(34, 34, 34) 30.3%, rgba(34, 34, 34, 0.90) 38.3%, rgba(34, 34, 34, 0.60) 58.3%, rgba(34, 34, 34, 0.04) 100%)",
          }}
        />

        <div className="absolute z-30 left-24 top-10 flex items-center gap-10">
          <div className="w-64 h-96">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt="Movie Poster"
              className="w-full h-full rounded-lg"
            />
          </div>
          <div>
            <MovieName movie={movie} />
          </div>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="backgrop poster"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}

export default BookTicket;
