import Grid from "@mui/material/Grid";
import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "../pages/Header";
import MenuTabs from "./MenuTabs";

const MainPage: FC = () => {
    return (
        <BrowserRouter>
            <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <Header />
                </Grid>
                <Grid item>
                    <MenuTabs />
                </Grid>
                <Grid item></Grid>
            </Grid>
        </BrowserRouter>
    );
};

export default MainPage;
