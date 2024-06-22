import React from 'react'
import { Outlet } from 'react-router-dom'
import { Stepper } from '../Stepper/Stepper'

export default function JobApplication() {
  return (
    <>
        <Stepper />
        <Outlet />   
    </>
  )
}
