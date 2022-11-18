import React, { FC } from "react";
import Typography from "@mui/material/Typography";

const Header: FC = () => {
    return (
        <Typography variant="h3" my={3} component="div">
            IP Subnet Calculator
        </Typography>
    );
};

export default Header;
