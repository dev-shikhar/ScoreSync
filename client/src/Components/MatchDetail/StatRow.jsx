import React from 'react'
const StatRow = ({ label, valueA, valueB, isPercentage = false }) => {
  // Determine bar widths
  let widthA, widthB;
  if (isPercentage) {
    widthA = valueA;
    widthB = valueB;
  } else {
    const maxVal = Math.max(valueA, valueB);
    if (maxVal === 0) {
      widthA = 0;
      widthB = 0;
    } else {
      widthA = (valueA / maxVal) * 100;
      widthB = (valueB / maxVal) * 100;
    }
  }

  // Fixed color gradients for each team
  const gradientA = `linear-gradient(to left, #14b8a6, #4ade80)`; // Teal gradient for Team A
  const gradientB = `linear-gradient(to right, #ef4444, #f87171)`; // Red gradient for Team B

  return (
    <div className="flex items-center justify-between w-full space-y-2 flex-wrap">
      {/* Team A Value */}
      <span className="font-bold text-sm md:text-base text-gray-800 dark:text-gray-200 w-8 text-left">{isPercentage ? `${valueA}%` : valueA}</span>

      {/* Center Section: Label and Bars */}
      <div className="flex-1 px-2">
        <p className="text-center text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
        <div className="flex items-center w-full">
          {/* Team A Bar Track */}
          <div className="flex-1 flex justify-end bg-gray-200 dark:bg-gray-700/50 rounded-l-full overflow-hidden">
            <div
              className="h-2.5 rounded-l-full transition-all duration-500 ease-out"
              style={{ width: `${widthA}%`, background: gradientA }}
            ></div>
          </div>
          {/* Team B Bar Track */}
          <div className="flex-1 flex justify-start bg-gray-200 dark:bg-gray-700/50 rounded-r-full overflow-hidden">
            <div
              className="h-2.5 rounded-r-full transition-all duration-500 ease-out"
              style={{ width: `${widthB}%`, background: gradientB }}
            ></div>
          </div>
        </div>
      </div>

      {/* Team B Value */}
      <span className="font-bold text-sm md:text-base text-gray-800 dark:text-gray-200 w-8 text-right">{isPercentage ? `${valueB}%` : valueB}</span>
    </div>
  );
};


export default StatRow