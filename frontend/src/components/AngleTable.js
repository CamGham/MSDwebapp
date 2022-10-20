import React from 'react'

const AngleTable = (props) => {
  return (
    <div className='container'>
        <div className='aiaCont'>
            Interior Angle: {props.intAngle}
        </div>
        <div className='aeaCont'>
        Exterior Angle: {props.extAngle}
        </div>
    </div>
  )
}

export default AngleTable