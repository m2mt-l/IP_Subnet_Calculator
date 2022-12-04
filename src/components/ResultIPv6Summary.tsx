import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React, { FC, memo } from "react";

import { useAppContextForIPv6Summary } from "../contexts/AppContextForIPv6Summary";
import { ipv6SummaryCalculator } from "../util/ipv6SummaryCalculator";

const ResultIPv6Summary: FC = memo(function resultIPv6Summary() {
    const { resultIPv6Summary } = useAppContextForIPv6Summary();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 370, maxWidth: 500 }} aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell>Summary Address</TableCell>
                        <TableCell align="right">
                            {ipv6SummaryCalculator(resultIPv6Summary)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default ResultIPv6Summary;
