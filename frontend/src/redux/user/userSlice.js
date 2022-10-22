import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: 'undefined',
        
    },
    reducers:{
        changeEmail: (state, action) =>{
            state.email = action.payload;
        }
    },
})

export const {changeEmail} = userSlice.actions;
export const getEmail = (state) => state.user.email;

export default userSlice.reducer;