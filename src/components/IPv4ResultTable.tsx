import React, { FC } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { ipv4ResultTable } from "../data/ipv4ResultTable";

const IPv4ResultTable: FC = () => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableBody>
                    {ipv4ResultTable.map((type, index) => (
                        <TableRow key={index}>
                            <TableCell>{type}</TableCell>
                            <TableCell align="right">x.x.x.x</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default IPv4ResultTable;
