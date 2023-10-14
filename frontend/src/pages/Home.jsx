import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  FaAsterisk,
  FaCheckCircle,
  FaInfo,
  FaTimesCircle,
} from "react-icons/fa";
import { MdInfo, MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import Phishing from "../assets/phishing_gif.gif";
import { useStateContext } from "../contexts/ContextProvider";
import { toast } from "react-toastify";
import Typed from "typed.js";

const Home = () => {
  const [url, setUrl] = useState("https://");
  const [score, setScore] = useState(null);
  const [showColor, setShowColor] = useState("");

  const { currentColor } = useStateContext();
  const color = `${currentColor}`;

  useEffect(() => {
    // Target the element where you want to display the animation
    const targetElement = document.getElementById("element");

    const options = {
      strings: [
        "Beign Scammed?",
        "Phish Scan Alert!",
        "Is Link Legit?",
        "Unmask the Links!",
        "Safe or Not?",
      ],
      typeSpeed: 50,
      backSpeed: 30, // Speed of erasing the word
      backDelay: 1000, // Delay after erasing the word (1 second in this example)
      startDelay: 500, // Delay before typing starts (optional)
      showCursor: true, // Show blinking cursor
    };

    // Initialize Typed.js
    const typed = new Typed(targetElement, options);

    // Clean up the Typed.js instance on unmount
    return () => {
      typed.destroy();
    };
  }, []);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    // Add your phishing report lookup logic here
    if (url !== "https://") {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        {
          url: url,
        },
        {
          headers: {
            "Content-Type": "application/json", // Corrected the typo here
          },
        }
      );
      if (response.data) {
        localStorage.setItem("lastUrl", url);

        let date = new Date().toLocaleString();
        date = date.split(", ");
        const new_score = response.data.probability.toFixed(3);

        const storedArray = JSON.parse(localStorage.getItem("history")) || [];
        storedArray.unshift({
          url,
          probability: new_score,
          time: date[1],
          date: date[0],
        });
        localStorage.setItem("history", JSON.stringify(storedArray));
        setScore(new_score);
        setShowColor(() =>
          new_score <= 40 ? "left" : new_score <= 60 ? "middle" : "right"
        );
      }
    } else {
      console.log(url);
      toast.error("Please edit the url input!");
    }
    setUrl("https://");
  };

  useEffect(() => {
    const postEntry = async () => {
      const response = await axios.post("http://localhost:5000/api/addEntry", {
        url: localStorage["lastUrl"],
        isMalacious: score >= 60 ? "Yes" : "No",
        maybeMalacious: score > 40 && score < 60 ? "Yes" : "No",
        isSafe: score <= 40 ? "Yes" : "No",
      });

      if (response.data.success) {
        console.log(response.data.message);
      }
    };
    if (score !== null) {
      postEntry();
    }
  }, [score]);
  const customStyles = {
    path: {
      stroke: "#000", // Set the color to black (#000)
    },
    text: {
      fill: "#000", // Set the text color to black (#000)
    },
  };
  return (
    <>
      <div className="flex items-center justify-center mt-14 py-6">
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="flex items-center justify-center gap-4">
            <div>
              <img
                src={Phishing}
                alt=""
                className="w-[10rem] h-[8rem] rounded-full"
              />
            </div>
            <div className="dark:text-white text-3xl font-bold " id="element">
              Is this link phishy?
            </div>
          </div>
          <form className="w-full">
            <div className="flex items-center">
              <input
                className="appearance-none rounded w-[25rem] py-3 px-3 text-[#00232A] leading-tight border border-gray-500 focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter text..."
                required
                onChange={handleUrlChange}
                value={url}
              />
              <button
                style={{ backgroundColor: color }}
                className=" text-white font-semibold py-3 px-6 rounded focus:outline-none focus:shadow-outline ml-4"
                onClick={handleSearch}
              >
                Scan
              </button>
            </div>
          </form>
        </div>
      </div>
      {score && (
        <div className="flex gap-4 flex-col justify-center my-16 w-[50%] mx-auto border border-gray-200 pt-20 pb-8 relative shadow-lg rounded-2xl">
          <MdOutlineCancel
            size={30}
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => {
              localStorage.removeItem("lastUrl");
              setScore(null);
            }}
          />
          <div className="dark:text-white text-black text-xl absolute top-[.6rem] left-4 w-[90%]">
            <span className=" font-semibold">{localStorage["lastUrl"]}</span>
          </div>
          <div className="mb-4 flex items-center justify-evenly">
            <CircularProgressbar
              value={score}
              text={`${score}%`}
              strokeWidth={12}
              styles={buildStyles({
                strokeLinecap: "round",
                textSize: "20px",
                pathTransitionDuration: 1,
                ...customStyles,
              })}
            />

            <div className="flex items-center gap-4">
              <button
                className={`${
                  showColor === "left" ? "text-green-500" : "text-gray-400"
                }`}
              >
                <FaCheckCircle size={showColor === "left" ? 50 : 32} />
              </button>
              <button
                className={`${
                  showColor === "middle" ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                <MdInfo size={showColor === "middle" ? 57 : 39} />
              </button>
              <button
                className={`${
                  showColor === "right" ? "text-red-500" : "text-gray-400"
                }`}
              >
                <FaTimesCircle size={showColor === "right" ? 50 : 32} />
              </button>
            </div>
          </div>
          <div className="dark:text-white text-black text-center">
            <span></span>
            {score > 60 ? (
              <span>
                The domain is
                <span className="text-red-600 text-xl ml-1 font-bold">
                  {" "}
                  Not Safe!
                </span>
              </span>
            ) : score > 40 ? (
              <span>
                This domain
                <span className="text-yellow-600 text-xl ml-1 font-bold">
                  may or may not be safe!
                </span>
              </span>
            ) : (
              <span>
                The domain is
                <span className="text-green-500 text-xl ml-1 font-bold">
                  {" "}
                  Safe!
                </span>
              </span>
            )}
            <span></span>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
