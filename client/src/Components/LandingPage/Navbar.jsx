import React from "react";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../../ThemeContext";
import SportsIcon from "@mui/icons-material/Sports";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex flex-wrap justify-between items-center px-4 pt-4 py-2 shadow-md bg-[#2c3ec4] dark:bg-[#111517]">
      <Link
        to="/"
        className="flex items-center space-x-1 text-2xl font-bold text-white"
      >
        <SportsIcon className="text-white" />
        <span>ScoreSync</span>
      </Link>

      <form
        className="flex w-md rounded-full border px-2 py-1 bg-white border-white dark:bg-[#272C32] dark:border-[#272C32]
             focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-colors duration-200"
        onSubmit={(e) => e.preventDefault()}
      >
        <SearchIcon className="px-0.5 text-black dark:text-white" />
        <input
          type="search"
          className="dark:placeholder-white placeholder-black w-full bg-transparent focus:outline-none text-black dark:text-white "
          placeholder="Search for Matches"
          aria-label="Search Matches"
        />
      </form>

      <form
        className="flex items-center mx-2 space-x-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          title="Toggle theme"
        >
          {theme !== "dark" ? (
            <DarkModeIcon className="text-yellow-500" />
          ) : (
            <LightModeIcon className="text-white" />
          )}
        </button>

        <button
          type="button"
          className="flex items-center dark:bg-white bg-[#2e3138] hover:bg-[#41454e] dark:text-black
                text-white py-2 px-4 rounded-full transition-colors cursor-pointer"
        >
          <AccountCircleOutlinedIcon className="mr-2" />
          Sign In
        </button>
      </form>
      <div className="w-full"></div>
      {/* <div className="w-[80%] mx-auto mt-2">
        <ul className="flex text-white ">
          <li className="px-3 pt-2 rounded transition duration-300 hover:bg-[#ffffff1a] hover:opacity-80">
            <Link>
              <SportsSoccerIcon />
              <br />
              Football
            </Link>
          </li>
          <li className="px-3 pt-2 rounded transition duration-300 hover:bg-[#ffffff1a] hover:opacity-80">
            <Link>
              <SportsCricketIcon />
              <br />
              Cricket
            </Link>
          </li>
          <li className="px-3 pt-2 rounded transition duration-300 hover:bg-[#ffffff1a] hover:opacity-80">
            <Link>
              <SportsTennisIcon /> <br />
              Tennis
            </Link>
          </li>
        </ul>
      </div> */}
    </nav>
  );
};

export default Navbar;