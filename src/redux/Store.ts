import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./Reducer";
import { defaultState } from "./State";


export default configureStore({
    preloadedState: defaultState,
    reducer: Reducer
})