import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";



const appStore = configureStore({
    reducer: {
        user : userReducer,
    },
});
export default appStore;


//create this store
//then provide this store to your application so they can use it
