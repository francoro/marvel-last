import { createTheme } from "@mui/material";

export const themeMUI = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: "1.5rem",
    },
    h6: {
      fontSize: "1.2rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
  },
});
