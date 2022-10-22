import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const DataTable = (props) => {
const data = props.data;

console.log(data);

    const createData = (name, calories, fat ) =>{
        return { name, calories, fat};
      }


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


  return (
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date </TableCell>
            <TableCell align="right">Arm Int Angle °</TableCell>
            <TableCell align="right">Arm Ext Angle °</TableCell>
            {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date.toDate().toDateString()}
              </TableCell>
              <TableCell align="right">{row.armInt}</TableCell>
              <TableCell align="right">{row.armExt}</TableCell>
              {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default DataTable