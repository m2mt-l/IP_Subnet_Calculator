import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

import "./App.css";
import MainPage from "./components/MainPage";
import { AppContextProvider } from "./contexts/AppContext";

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
            <AppContextProvider>
                <MainPage />
            </AppContextProvider>
        </ThemeProvider>
    );
};

export default App;
