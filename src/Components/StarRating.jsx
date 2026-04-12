import React, { useState } from "react";
import EmptyStarImg from "../../public/Icons/star.png";
import FillStarImg from "../../public/Icons/star-fil.png";

function StarRating() {
  const [tempRating, setTempRating] = useState(0);
  const [rating, setRating] = useState(0);

  return (
    <div className="flex items-center gap-1 ">
      {Array.from({ length: 5 }, (_, index) => (
        <SetRating
          key={index}
          src={tempRating ? tempRating >= index + 1 : rating >= index + 1}
          onClick={() => setRating(index + 1)}
          onMouseEnter={() => setTempRating(index + 1)}
          onMouseLeave={() => setTempRating(0)}
        />
      ))}
    </div>
  );
}

export default StarRating;

function SetRating({ src, onMouseEnter, onMouseLeave, onClick }) {
  return (
    <button
      className="cursor-pointer"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {src ? (
        <img
          src={FillStarImg}
          alt="filled star"
          className="h-5 w-5 object-contain"
        />
      ) : (
        <img
          src={EmptyStarImg}
          alt="empty star"
          className="h-5 w-5 object-contain"
        />
      )}
    </button>
  );
}
