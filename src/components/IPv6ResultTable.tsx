import React, { FC, memo } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { ipv6ResultTable } from "../data/ipv6ResultTable";
import { ipv6Calculator } from "../util/ipv6Calculator";
import { IPv6Address } from "../model/IPv6Address";

const IPv6ResultTable: FC<IPv6Address> = memo(function IPv6ResultTableComponent(props) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 370, maxWidth: 500 }} aria-label="simple table">
                <TableBody>
                    {ipv6ResultTable.map((type, index) => (
                        <TableRow key={index}>
                            <TableCell>{type}</TableCell>
                            <TableCell align="right">{ipv6Calculator(type, props)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default IPv6ResultTable;
