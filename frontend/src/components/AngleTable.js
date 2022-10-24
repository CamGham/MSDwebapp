import React from 'react'
import AngleComponent from './AngleComponent'
import "./AngleTable.css"

const AngleTable = (props) => {
  return (
    <div className='table'>
        <AngleComponent angle={props.intAngle} name={"Arm Int"}/>
        <AngleComponent angle={props.extAngle} name={"Arm Ext"}/>
        <AngleComponent angle={props.relAngle} name={"Release"}/>
        
    </div>
  )
}

export default AngleTable