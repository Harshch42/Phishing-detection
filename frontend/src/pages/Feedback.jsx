import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";

const Feedback = () => {
  const [improvement, setImprovement] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [additionalFeedback, setAdditionalFeedback] = useState("");

  const { currentColor } = useStateContext();
  const color = `${currentColor}`;

  const handleRecommendationChange = (event) => {
    const value = event.target.value;
    setRecommendation(value);
  };

  const handleSubmit = () => {
    console.log("Improvement:", improvement);
    console.log("Recommendation:", recommendation);
    console.log("Additional Feedback:", additionalFeedback);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 my-10 rounded-lg shadow-lg dark:text-[#00232A]">
      <h2 className="text-2xl font-semibold mb-6">Feedback</h2>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="improvement"
        >
          How would you like to improve our service?
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="improvement"
          value={improvement}
          onChange={(e) => setImprovement(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="recommendation"
        >
          Would you recommend our service? Enter a rating between 1-10
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="recommendation"
          value={recommendation}
          onChange={handleRecommendationChange}
          max={10}
          min={1}
          required
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="additionalFeedback"
        >
          Additional Feedback
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="additionalFeedback"
          value={additionalFeedback}
          onChange={(e) => setAdditionalFeedback(e.target.value)}
        />
      </div>

      <button
        style={{ backgroundColor: color }}
        className={`bg-[${color}] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline `}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Feedback;
