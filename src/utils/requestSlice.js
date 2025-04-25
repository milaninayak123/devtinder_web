import { createSlice } from "@reduxjs/toolkit"

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers:{
        addRequests : (state , action) => action.payload ,
        removeRequest: (state , action) => {
            // state is an array containing the req id etc.
            //and you want to remove that
            const newArray = state.filter((r) => r._id !== action.payload);  
            return newArray;
        }
    },
});

export const { addRequests , removeRequest} = requestSlice.actions;
export default requestSlice.reducer;