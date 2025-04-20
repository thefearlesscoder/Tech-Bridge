
import { createSlice } from '@reduxjs/toolkit'

const userInfoFromStorage = localStorage.getItem("userinfo")
  ? JSON.parse(localStorage.getItem("userinfo"))
  : null;

const tokenFromStorage = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  user: userInfoFromStorage,
  token: tokenFromStorage,
  loading: false,
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