import React from 'react'
import './style.css'
export const NextButton = ({type, title, onClick}) => {
  return (
    <button className='nextButton' type={type} onClick={onClick}>{title}</button>
  )
}
