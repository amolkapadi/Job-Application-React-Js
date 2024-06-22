import { createSlice } from '@reduxjs/toolkit'


const initialState = {
   data: [{
      companyName: '',
      jobTitle: '',
      duration: '',
   }],
   loading: false,
   error: null,
 };


export const workExperianceData = createSlice({
   name:"workExperianceData",
   initialState,
   reducers:{
      setData(state, action) {
         state.data = action.payload;
       },
       setLoading(state, action) {
         state.loading = action.payload;
       },
       setError(state, action) {
         state.error = action.payload;
       },
   }

})

export const { setData, setLoading, setError } = workExperianceData.actions;

export default workExperianceData.reducer