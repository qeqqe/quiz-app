import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Selection() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((response) => setCategories(response.data.trivia_categories))
      .catch((error) => console.error("Error fetching categories", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/quiz", {
      state: {
        category: selectedCategory,
        difficulty: selectedDifficulty,
        type: selectedType,
      },
    });
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-200 via-indigo-500 to-indigo-800">
        <div
          className="flex justify-center mt-[5vh] min-h-[7vh]"
          id="top-header"
        >
          <h1 className="text-4xl text-white font-extrabold hover:text-slate-200 transition-colors">
            Selection Area
          </h1>
        </div>
        <div
          className="min-h-[75vh] w-full flex px-[30vw] flex-col"
          id="selection-area"
        >
          <div className="flex gap-8 flex-col" id="selection-container">
            <form
              className="flex justify-center flex-col gap-8 items-center min-h-[75vh] min-w-[80vh]"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-full items-center">
                <label className="text-lg font-semibold text-white mb-2">
                  Select Category:
                </label>
                <select
                  className="w-[50%] py-2 px-4 rounded-md border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Any Category</option>
                  {categories.map((cat) => (
                    <option value={cat.id} key={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col w-full items-center">
                <label className="text-lg font-semibold text-white mb-2">
                  Select Difficulty:
                </label>
                <select
                  className="w-[50%] py-2 px-4 rounded-md border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="">Any Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="flex flex-col w-full items-center">
                <label className="text-lg font-semibold text-white mb-2">
                  Select Type:
                </label>
                <select
                  className="w-[50%] py-2 px-4 rounded-md border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">Any Type</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="boolean">True/False</option>
                </select>
              </div>

              <button
                type="submit"
                className="mb-[20vh] text-white py-[3vh] bg-gradient-to-br from-indigo-800 via-indigo-500 to-indigo-400 px-[3vw] rounded-3xl hover:scale-95 active:scale-[0.85] transition-all duration-300 shadow-2xl hover:shadow-inner hover:from-indigo-900 hover:via-indigo-500 hover:to-indigo-400"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
