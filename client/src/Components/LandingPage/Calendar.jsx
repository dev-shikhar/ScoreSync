import React, { useContext, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import dayjs from "dayjs";
import { useTheme } from "../../ThemeContext";

export default function Calendar(prop) {
  const { theme } = useTheme(); 

  const muiTheme = createTheme({
    palette: { mode: theme },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            height: "100%",
            fontSize: "0.8rem",
          },
          input: {
            padding: "6px 8px",
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: "0.75rem",
          },
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex items-center gap-2">
          <DatePicker
            onChange={(newDate) => {
              prop.sendDate(newDate);
            }}
            defaultValue={dayjs()}
            views={["month", "day"]}
            slotProps={{
              textField: {
                size: "small",
                variant: "outlined",
                sx: { width: "130px" },
              },
            }}
          />
        </div>
      </LocalizationProvider>
    </MuiThemeProvider>
  );
}
