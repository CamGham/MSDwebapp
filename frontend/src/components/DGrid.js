import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DGrid = (props) => {
  const { data, setSelectedRow } = props;

  // console.log(data);

  // define table columns
  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "date", headerName: "Date", flex:2 },
    { field: "armInt", headerName: "Arm Int Angle °" , flex:1 },
    { field: "armExt", headerName: "Arm Ext Angle °" , flex:1 },
  ];

  const rows = data.map((row) => ({
    id: row.date,
    date:
      row.date.toDate().toDateString() +
      ", " +
      row.date.toDate().toLocaleTimeString(),
    armInt: row.armInt,
    armExt: row.armExt,
  }));

  //   const rows = [
  //     createData('Frozen yoghurt', 159, 6.0),
  //     createData('Ice cream sandwich', 237, 9.0),
  //     createData('Eclair', 262, 16.0),
  //     createData('Cupcake', 305, 3.7),
  //     createData('Gingerbread', 356, 16.0),
  //   ];

  //   const rows = data.map((row) =>{
  //     createData(row.date, row.armInt, row.armExt);
  //   })

  // const rows2 = data;

  //     useEffect(()=>{
  // console.log("HERE?" + show);
  //     },[show])

  //     const handleClick = () =>{
  //       setShowModal(true)
  //     }

  return (
    // <div>
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Date </TableCell>
    //         <TableCell align="right">Arm Int Angle °</TableCell>
    //         <TableCell align="right">Arm Ext Angle °</TableCell>
    //         <TableCell align="right">Analysis</TableCell>
    //         {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
    //         <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {data.map((row) => (
    //         <TableRow
    //           key={row.date}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //           <TableCell component="th" scope="row">
    //             {row.date.toDate().toDateString() + ", " +  row.date.toDate().toLocaleTimeString()}
    //           </TableCell>
    //           <TableCell align="right">{row.armInt}</TableCell>
    //           <TableCell align="right">{row.armExt}</TableCell>
    //           <TableCell align='right'>
    //             <Button onClick={handleClick}>
    //               View Details
    //             </Button>
    //           </TableCell>
    //           {/* <TableCell align="right">{row.carbs}</TableCell>
    //           <TableCell align="right">{row.protein}</TableCell> */}
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
    // </div>
    <div style={{ display: "flex", height: "100%", width: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight={true}
          disableColumnMenu={true}
          // density={'compact'}
          pageSize={8}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
            setSelectedRow(selectedRows);
          }}
          rowsPerPageOptions={[8, 10, 20]}
        />
      </div>
    </div>
  );
};

export default DGrid;
