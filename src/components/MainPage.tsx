import React, { FC } from "react";
import Header from "./Header";
import MenuTabs from "./MenuTabs";

// Material UI
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import IPv4ResultTable from "./IPv4ResultTable";

const MainPage: FC = () => {
    return (
        <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
            <Grid item>
                <Header />
            </Grid>
            <Grid item>
                <MenuTabs />
            </Grid>
            <Divider flexItem />
            <Grid item>
                <IPv4ResultTable />
            </Grid>
        </Grid>
    );
};

export default MainPage;
