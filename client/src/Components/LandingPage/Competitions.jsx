import React, { useEffect, useState } from "react";
import CompName from "./CompName";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Competitions = () => {
  const [compList, setCompList] = useState([]);
  const [visible, setVisible] = useState(25);

  function handleClick() {
    setVisible((prev) => prev + 10);
  }
  useEffect(() => {
    async function fetchCompName() {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/top-competitions`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        setCompList(data);
      } catch (error) {
        console.log("Fetch error:", error.message);
      }
    }

    fetchCompName();
  }, []);

  return (
    <div className=" ml-5 w-[33%]">
      <div className="flex flex-col text-black dark:text-white w-full bg-white dark:bg-[#111517]   rounded-md">
        <h2 className="text-center pb-3 mt-3">Top Competitions</h2>

        {compList.slice(0, visible).map((comp, index) => (
          <CompName key={index} name={comp} />
        ))}
        {visible < compList.length && (
          <div className="w-full flex justify-center">
            <button
              className="mx-auto rounded-full px-2 py-1 text-[#7a84ff] cursor-pointer transition hover:bg-[#f2f4f7] dark:hover:bg-[#0B0E0F]"
              onClick={handleClick}
            >
              <KeyboardArrowDownIcon />
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Competitions;
