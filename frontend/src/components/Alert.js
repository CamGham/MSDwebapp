import React, {useState} from 'react'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = (props) => {
    const [open, setOpen] = useState(props.open);
    const sev = props.sev;
    const handleClose = () =>{
        setOpen(false);
    }
  return (
    <div>
        <Snackbar open={open} onClose={handleClose} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <MuiAlert elevation={6} onClose={handleClose} variant="filled" severity={sev} sx={{ width: '100%' }}>
          This is a success message!
        </MuiAlert>
      </Snackbar>
    </div>
  )
}

export default Alert