import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";


const appStore = configureStore({
    reducer: {
        user : userReducer,
        feed : feedReducer,
        connections: connectionReducer,
    },
});
export default appStore;


//create this store
//then provide this store to your application so they can use it
