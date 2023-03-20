import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        getScreenshot(state, action) { 
            state.push(action.payload)
        },
    }
})

console.log(userSlice.actions);
export { userSlice };
export const {getScreenshot} = userSlice.actions;