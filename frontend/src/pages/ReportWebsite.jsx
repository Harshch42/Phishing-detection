import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { toast } from "react-toastify";

const ReportWebsite = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [reason, setReason] = useState("");

  const handleCategoriesChange = (event) => {
    const selectedCategories = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setCategories(selectedCategories);
  };
  const { currentColor } = useStateContext();
  const color = `${currentColor}`;

  const handleSubmit = () => {
    const storedArray = JSON.parse(localStorage.getItem("alerts")) || [];

    storedArray.unshift({
      website_url: url,
      website_title: title,
      desc_as_fake_websites_done_by_them: reason,
    });
    console.log(storedArray);
    localStorage.setItem("alerts", JSON.stringify(storedArray));

    setReason("");
    setUrl("");
    setTitle("");
    setCategories([]);
    toast.success("Review submitted!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 my-10 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">
        Report Malicious/Phishing Website
      </h2>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="reason"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="reason"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="url"
        >
          Website URL
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="categories"
        >
          Categories
        </label>
        <select
          multiple
          className="block w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="categories"
          onChange={handleCategoriesChange}
        >
          <option value="phishing">Phishing</option>
          <option value="malware">Malware</option>
          <option value="fraud">Fraud</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="reason"
        >
          Why is it being flagged?
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
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

export default ReportWebsite;
