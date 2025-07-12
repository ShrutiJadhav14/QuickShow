import { StarIcon, Heart, HeartOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeFormat from "../lib/TimeFormat";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage on mount
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavs);
  }, []);

  const addToFavourites = (movieId) => {
    const storedFavs = JSON.parse(localStorage.getItem("favourites")) || [];
    let updatedFavs;

    if (storedFavs.includes(movieId)) {
      updatedFavs = storedFavs.filter((id) => id !== movieId);
    } else {
      updatedFavs = [...storedFavs, movieId];
    }

    localStorage.setItem("favourites", JSON.stringify(updatedFavs));
    setFavourites(updatedFavs); // Update state to reflect change
  };

  const isFavourite = favourites.includes(movie._id);

  return (
    <div className="flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-60">
      <img
        src={movie.backdrop_path}
        alt={movie.title || "Movie"}
        className="rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer"
        onClick={() => navigate(`/movies/${movie._id}`)}
      />
      <p className="font-semibold mt-2 truncate">{movie.title}</p>

      <p className="text-sm text-gray-400 mt-2">
        {new Date(movie.release_date).getFullYear()} ·{" "}
        {movie.genres?.slice(0, 2).map((g) => g.name).join(" | ")} ·{" "}
        {TimeFormat(movie.runtime)}
      </p>

      <div className="flex items-center justify-between mt-4 pb-3">
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          className="px-4 py-2 text-xs bg-red-400 hover:bg-red-300 transition rounded-full font-medium cursor-pointer"
        >
          Buy Tickets
        </button>

        {/* Toggle Favourite Icon */}
        {isFavourite ? (
          <Heart
            onClick={() => addToFavourites(movie._id)}
            className="w-4 h-4 text-red-500 cursor-pointer"
          />
        ) : (
          <HeartOff
            onClick={() => addToFavourites(movie._id)}
            className="w-4 h-4 text-gray-400 cursor-pointer"
          />
        )}

        <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
          <StarIcon className="w-4 h-4 text-primary fill-primary" />
          {movie.vote_average?.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
