import React from 'react'
import './style.css'
export const PreButton = ({type, title, onClick}) => {
  return (
    <button className='preButton' type={type} onClick={onClick}>{title}</button>
  )
}
