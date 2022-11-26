import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React, { FC, memo } from "react";

import { ipv6ResultTable } from "../data/ipv6ResultTable";
import { IPv6Address } from "../model/IPv6Address";
import { ipv6SubnetCalculator } from "../util/ipv6SubnetCalculator";

const IPv6ResultTable: FC<IPv6Address> = memo(function IPv6ResultTableComponent(props) {
    // console.log("check render IPv6ResultTable");
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 370, maxWidth: 500 }} aria-label="simple table">
                <TableBody>
                    {ipv6ResultTable.map((type, index) => (
                        <TableRow key={index}>
                            <TableCell>{type}</TableCell>
                            <TableCell align="right">{ipv6SubnetCalculator(type, props)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default IPv6ResultTable;
