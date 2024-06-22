import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   data: {
     name: '',
     mobileNo: '',
     address: '',
     email: '',
   },
   loading: false,
   error: null,
 };

export const personalData = createSlice({
   name:"personalData",
   initialState,
   reducers: {
     setData(state, action) {
       state.data = action.payload;
     },
     setLoading(state, action) {
       state.loading = action.payload;
     },
     setError(state, action) {
       state.error = action.payload;
     },
     resetForm(state) {
       state.data = initialState.data;
       state.loading = false;
       state.error = null;
     },
   },
})
export const { setData, setLoading, setError, resetForm } = personalData.actions;
export default personalData.reducer