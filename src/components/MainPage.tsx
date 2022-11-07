import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";

// Material UI
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import Header from "./Header";
import MenuTabs from "./MenuTabs";
import IPv4ResultTable from "./IPv4ResultTable";

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
