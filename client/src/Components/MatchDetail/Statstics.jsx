import React from "react";
import StatRow from "./StatRow";

const statsData = [
  { label: "Shots on Goal", valueA: 2, valueB: 10, higherIsBetter: true },
  { label: "Shots off Goal", valueA: 4, valueB: 8, higherIsBetter: false },
  { label: "Total Shots", valueA: 8, valueB: 28, higherIsBetter: true },
  { label: "Blocked Shots", valueA: 2, valueB: 10, higherIsBetter: true },
  { label: "Shots insidebox", valueA: 6, valueB: 22, higherIsBetter: true },
  { label: "Shots outsidebox", valueA: 2, valueB: 6, higherIsBetter: true },
  { label: "Fouls", valueA: 15, valueB: 14, higherIsBetter: false },
  { label: "Corner Kicks", valueA: 9, valueB: 13, higherIsBetter: true },
  { label: "Offsides", valueA: 4, valueB: 2, higherIsBetter: false },
  {
    label: "Ball Possession",
    valueA: 28,
    valueB: 72,
    higherIsBetter: true,
    isPercentage: true,
  },
  { label: "Yellow Cards", valueA: 2, valueB: 1, higherIsBetter: false },
  { label: "Red Cards", valueA: 1, valueB: 0, higherIsBetter: false },
  { label: "Goalkeeper Saves", valueA: 10, valueB: 1, higherIsBetter: true },
  { label: "Total passes", valueA: 369, valueB: 970, higherIsBetter: true },
  { label: "Passes accurate", valueA: 261, valueB: 881, higherIsBetter: true },
  {
    label: "Passes %",
    valueA: 71,
    valueB: 91,
    higherIsBetter: true,
    isPercentage: true,
  },
];

const Statstics = () => {
  return (
    <div >
      <div className="min-h-screen  text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans ">
        <div className="max-w-4xl mx-auto">
          {/* Main Stats Card */}
          <main className="bg-white dark:bg-[#171C1F] rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 backdrop-blur-sm border border-black/5 dark:border-white/5">
            <div className="flex justify-between items-center mb-6 px-1">
              <h2 className="text-lg md:text-xl font-semibold text-teal-600 dark:text-teal-400">
                Team A
              </h2>
              <h2 className="text-lg md:text-xl font-semibold text-red-600 dark:text-red-400">
                Team B
              </h2>
            </div>

            {/* Stats List */}
            <div className="space-y-4">
              {statsData.map((stat, index) => (
                <StatRow
                  key={index}
                  label={stat.label}
                  valueA={stat.valueA}
                  valueB={stat.valueB}
                  isPercentage={stat.isPercentage}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Statstics;
