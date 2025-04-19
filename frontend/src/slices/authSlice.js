
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading : false ,
    user : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ) : null ,
    token : localStorage.getItem('token') ? localStorage.getItem('token') : null 
};

const authSlice = createSlice({
    name:"auth",
    initialState: initialState ,
    reducers: {
        setLoading ( state , value ){
            state.loading = value.payload ;
        },
        setUser ( state , value ) {
            state.user = value.payload ;
        },
        setToken ( state , value ) {
            state.user = value.payload ;
        },
        logout (state) {
            state.token = null;
            state.user = null;
            state.loading = false;
          }
          
    },
    
});

export const { setLoading , setUser , setToken ,logout} = authSlice.actions ;
export default authSlice.reducer ;