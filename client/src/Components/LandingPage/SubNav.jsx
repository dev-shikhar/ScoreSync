import React, { useState } from "react";
import Calendar from "./Calendar";

const styleSelected = {
  color: "#7a84ff",
  borderBottom: '2px solid #7a84ff',
};
const styleNotSelected = {
  color: "#7a84ff",
  opacity: "0.6",
};

const SubNav = (prop) => {
  const [selected, setState] = useState("All");
  function setAll() {
    if (selected === "Favorites") {
      setState("All");
    }
    return;
  }
  function setFavorites() {
    if (selected === "All") {
      setState("Favorites");
    }
    return;
  }
  return (
    <div className="w-full">
      <div className="flex justify-between pb-1">
        <div className="flex gap-3 ">
          <button
            onClick={setAll}
            className="ml-1  cursor-pointer w-15 text-center"
            style={selected === "All" ? styleSelected : styleNotSelected}
          >
            All
          </button>
          <button
            onClick={setFavorites}
            className="cursor-pointer text-center w-20"
            style={selected === "Favorites" ? styleSelected : styleNotSelected}
          >
            Favorites
          </button>
        </div>
        <Calendar sendDate = {prop.setDate}/>
      </div>
        <hr className='mb-2'></hr>
    </div>
  );
};

export default SubNav;
