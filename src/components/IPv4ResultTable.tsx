import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React, { FC, memo } from "react";

import { ipv4ResultTable } from "../data/ipv4ResultTable";
import { IPv4Address } from "../model/IPv4Address";
import { ipv4SubnetCalculator } from "../util/ipv4SubnetCalculator";

const IPv4ResultTable: FC<IPv4Address> = memo(function IPv4ResultTable(props) {
    // console.log("check render IPv4ResultTable");
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 370, maxWidth: 500 }} aria-label="simple table">
                <TableBody>
                    {ipv4ResultTable.map((type, index) => (
                        <TableRow key={index}>
                            <TableCell>{type}</TableCell>
                            <TableCell align="right">{ipv4SubnetCalculator(type, props)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default IPv4ResultTable;
