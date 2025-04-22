import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";


const appStore = configureStore({
    reducer: {
        user : userReducer,
        feed : feedReducer,
    },
});
export default appStore;


//create this store
//then provide this store to your application so they can use it
