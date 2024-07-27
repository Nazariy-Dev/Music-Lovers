import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { musicLoversAPI } from "./api/musicLoversAPI";
import userReducer from "./reducers/UserSlice";
import { setupListeners } from "@reduxjs/toolkit/query";


const rootReducer = combineReducers({
    userReducer,
    [musicLoversAPI.reducerPath]: musicLoversAPI.reducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(musicLoversAPI.middleware)
})

export const setupStore = () => {
    return store
}

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']


