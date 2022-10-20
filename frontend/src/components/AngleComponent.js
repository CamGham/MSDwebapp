import React from 'react'
import "./AngleComponent.css"
const AngleComponent = (props) => {
  return (
    <div className='container'>
        <div className='name'>
            {props.name} Angle
        </div>
        <div className='angle'>
            {props.angle}
        </div>
    </div>
  )
}

export default AngleComponent