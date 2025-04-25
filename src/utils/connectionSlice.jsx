import { createSlice } from "@reduxjs/toolkit"

const connectionslice = createSlice({
    name: 'connection',
    initialState:null,
    reducers:{
        addConnections: (state , action) => action.payload,
        removeConnections: () => null,
    },
});

export const {addConnections , removeConnections} = connectionslice.actions;

export default connectionslice.reducer;