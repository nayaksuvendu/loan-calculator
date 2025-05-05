import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useApp } from "./context/AppContext.jsx";
import Home from "./pages/Home.jsx";
// import About from "./pages/About";
import ExchangeRates from "./pages/ExchangeRates.jsx";
// import NotFound from "./pages/NotFound";
// import ErrorPage from "./pages/ErrorPage";
import { getTheme } from "./theme.js";

export default function App() {
  const { theme } = useApp();
  const themes = getTheme(theme);
  return (
    <>
    <ThemeProvider theme={themes}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/exchange" element={<ExchangeRates />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<NotFound />} />  */}
        </Routes>
      </Router>
    </ThemeProvider>
    </>
  )
}



