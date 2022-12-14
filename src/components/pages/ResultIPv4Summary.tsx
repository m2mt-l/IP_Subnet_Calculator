import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React, { FC, memo } from "react";

import { useAppContextForIPv4Summary } from "../../contexts/AppContextForIPv4Summary";
import { ipv4SummaryCalculator } from "../../util/ipv4SummaryCalculator";

const ResultIPv4Summary: FC = memo(function resultIPv4Summary() {
    const { resultIPv4Summary } = useAppContextForIPv4Summary();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 370, maxWidth: 500 }} aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell>Summary Address</TableCell>
                        <TableCell align="right">
                            {ipv4SummaryCalculator(resultIPv4Summary)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default ResultIPv4Summary;
