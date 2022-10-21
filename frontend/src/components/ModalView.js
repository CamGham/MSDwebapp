import React, {useState} from 'react'
import { Modal } from '@mui/material'
import "./ModalView.css"

const ModalView = (props) => {
    const show = props.show;
  return (
    <div>
        <Modal
        open={show}
        >
            
            <h1>
                Loading...
            </h1>
        </Modal>
    </div>
  )
}

export default ModalView