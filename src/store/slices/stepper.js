import { createSlice } from '@reduxjs/toolkit'


const initialState = {
   stepperWidth:'0%',
 };
export const stepper = createSlice({
   name:"stepperWidth",
   initialState,
   reducers:{
      setWidth(state, action) {
        console.log(action.payload)
         state.stepperWidth = action.payload 
       }
       
      }
})
export const { setWidth } = stepper.actions;

export default stepper.reducer 