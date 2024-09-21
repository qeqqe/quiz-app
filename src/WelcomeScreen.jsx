import React from "react";
import { Link } from "react-router-dom";
export default function WelcomeScreen() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-200 via-indigo-500 to-indigo-800 ">
        <div
          className="min-h-[40vh] w-full gap-3 flex flex-col mt-[10vh] items-center"
          id="top-section"
        >
          <h1 className="text-[50px] text-white font-extrabold ">Quiz App</h1>
        </div>
        <div className="min-h-[50vh] w-full flex flex-col-reverse justify-center items-center">
          <button className="mb-[20vh] text-white py-[3vh] bg-gradient-to-br from-indigo-800 via-indigo-500 to-indigo-400 px-[3vh] rounded-3xl hover:scale-95 active:scale-[0.85] transition-all duration-300 shadow-2xl hover:shadow-inner hover:from-indigo-900 hover:via-indigo-500 hover:to-indigo-400 ">
            <Link to="/Selction">Start quiz</Link>
          </button>
        </div>
      </div>
    </>
  );
}

{
  /* <Link to="/Selction">Hi</Link> */
}
