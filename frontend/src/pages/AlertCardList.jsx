import React from "react";

const AlertCardList = ({ data }) => {
  return (
    <div className="container mx-auto mt-8 flex flex-wrap gap-4 ">
      <div className="bg-white shadow-lg rounded-lg p-4 dark:bg-[#00232A] dark:text-white">
        <h2 className="text-xl font-semibold mb-2 ">{data.website_title}</h2>
        <div className="flex justify-between mb-2">
          <div className="text-blue-500">{data.website_url}</div>
        </div>
        <p className="text-gray-700 dark:text-white">
          {data.desc_as_fake_websites_done_by_them}
        </p>
      </div>
    </div>
  );
};

export default AlertCardList;
