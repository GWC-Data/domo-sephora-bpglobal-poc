import React from "react";

const PercentageSlider = ({ percentage }) => {
  return (
    <div className="w-full max-w-xl mx-auto h-[80%] mt-8 flex flex-col justify-center">
      <div className="px-4">
        <div className="relative w-full h-2 bg-[#000000] rounded-full">
          <div
            className="absolute top-0 h-2 bg-[#de0f3f] rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>

          <input
            type="range"
            min="0"
            max="100"
            value={percentage}
            readOnly
            className="absolute w-full h-2 opacity-0 cursor-not-allowed"
          />

          <div
            className="absolute top-[-4px] w-4 h-4 bg-[#de0f3f] rounded-full shadow-md border-2 border-[#000000]"
            style={{ left: `calc(${percentage}% - 10px)` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between text-sm mb-1 text-[#000000]">
        <span>Male</span>
        <span>Female</span>
      </div>

      <div className="text-center mt-2 text-sm text-[#000000]">
        {/* You can show the percentage value here if needed */}
      </div>
    </div>
  );
};

export default PercentageSlider;
