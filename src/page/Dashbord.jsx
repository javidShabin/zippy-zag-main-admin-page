import React from "react";

const Dashbord = () => {
  return (
    <section className="flex justify-center items-center gap-7">
      <div className="w-[350px] h-[200px] bg-[#ff961f] m-6 rounded-lg shadow-md ">
        <div className="flex justify-between items-center">
          <h3>Restaurants</h3>
          <h1 className="text-[150px] font-extrabold text-[#ffffff7c]">21</h1>
        </div>
      </div>
      <div className="w-[350px] h-[200px] bg-[#ffffff] m-6 rounded-lg shadow-md"></div>
      <div className="w-[350px] h-[200px] bg-[#ffffff] m-6 rounded-lg shadow-md "></div>
    </section>
  );
};

export default Dashbord;
