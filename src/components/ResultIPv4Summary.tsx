import Typography from "@mui/material/Typography";
import React, { FC } from "react";

import { useAppContext } from "../contexts/AppContext";
import { ipv4SummaryCalculator } from "../util/ipv4SummaryCalculator";

const ResultIPv4Summary: FC = () => {
    const { ipv4SummaryArray } = useAppContext();

    return (
        <Typography align="center" variant="h5" my={3} component="div">
            {ipv4SummaryCalculator(ipv4SummaryArray)}
        </Typography>
    );
};

export default ResultIPv4Summary;
