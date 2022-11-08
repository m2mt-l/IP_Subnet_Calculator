import React, { FC } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { ipv6ResultTable } from "../data/ipv6ResultTable";

const IPv6ResultTable: FC<{ ipv6Address: string; subnet: string }> = ({ ipv6Address, subnet }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 370 }} aria-label="simple table">
                <TableBody>
                    {ipv6ResultTable.map((type, index) => (
                        <TableRow key={index}>
                            <TableCell>{type}</TableCell>
                            <TableCell align="right">xxx</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default IPv6ResultTable;