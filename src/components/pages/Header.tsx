import Typography from "@mui/material/Typography";
import React, { FC } from "react";

const Header: FC = () => {
    return (
        <Typography variant="h4" my={3} component="div">
            IP Subnet Calculator
        </Typography>
    );
};

export default Header;
