import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MainPage from "./components/MainPage";

import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const App: React.FunctionComponent = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainPage />
        </ThemeProvider>
    );
};

export default App;
