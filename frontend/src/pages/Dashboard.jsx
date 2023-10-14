import React from "react";

const Dashboard = () => {
  const data = JSON.parse(localStorage.getItem("history"));
  let filteredData = data.slice(0, 11);

  return (
    <div className="container h-[85vh] mx-auto overflow-y-scroll ">
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((website, index) => (
          <div
            className="flex justify-between bg-white  items-center shadow-lg rounded-lg p-4 m-4"
            key={index}
          >
            <div className="  p-4">
              <h2 className="text-lg font-semibold text-blue-700">
                <a href={website.url}>{website.url}</a>
              </h2>
              <p className="text-gray-600">
                Score: <span className="text-lg">{website.probability}</span>
              </p>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-blue-700">
                Time : {website.time}
              </h2>
              <p className="text-gray-600">
                Date: <span className="text-lg">{website.date}</span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <div>No history available</div>
      )}
    </div>
  );
};

export default Dashboard;
