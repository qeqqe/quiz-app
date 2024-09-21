import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ScoreBoard() {
  const location = useLocation();
  const { TotalScore } = location.state || {};

  const [response, setResponse] = useState("");

  const check = () => {
    if (TotalScore >= 8) {
      setResponse("You did Excellent!");
    } else if (TotalScore >= 6) {
      setResponse("It wass good!");
    } else {
      setResponse("Can do better");
    }
  };

  useEffect(() => {
    check();
  }, [TotalScore]);
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-200 via-indigo-500 to-indigo-800">
        <h1 className="text-white text-2xl font-extrabold">Your Score:</h1>
        <h2 className="text-white text-xl font-semibold">
          <span className="text-green-500 font-extrabold ">{TotalScore}</span>{" "}
          out of 10. {response}
        </h2>
        <div className="">
          <button className="mb-[20vh] mt-[30vh] text-white py-[3vh] bg-gradient-to-br from-indigo-800 via-indigo-500 to-indigo-400 px-[3vh] rounded-3xl hover:scale-95 active:scale-[0.85] transition-all duration-300 shadow-2xl hover:shadow-inner hover:from-indigo-900 hover:via-indigo-500 hover:to-indigo-400 ">
            <Link to="/">Restart quiz</Link>
          </button>
        </div>
      </div>
    </>
  );
}
