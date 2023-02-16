import { HomePage } from "./components/HomePage";
import { DetailPage } from "./components/DetailPage";
import { Provider } from "react-redux";
import store from "./store";
import { createContext, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeMUI } from "./theme";
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = {
    darkMode,
    toggleDarkMode,
  };
  return (
    <ThemeProvider theme={themeMUI}>
      <Provider store={store}>
        <ThemeContext.Provider value={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/characters" element={<HomePage />}></Route>
              <Route path="/character/:id" element={<DetailPage />}></Route>
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
