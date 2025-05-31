import { createSlice } from "@reduxjs/toolkit";
import NavBar from "../../components/NavBar/NavBar";

const initialState = {
    log: true,
    
}

const navSlice = createSlice({
    name: 'NavBar',
    initialState: initialState,
    reducers: {
        fuller: (state,action)=>{
            state.log = !state.log;
        }
    }
});

export const navReducer = navSlice.reducer;
export const navActions = navSlice.actions;