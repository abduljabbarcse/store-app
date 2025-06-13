import { configureStore } from '@reduxjs/toolkit';
import productCatalogReducer from "./slices/productCatalogSlice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            productCatalog: productCatalogReducer,
        },
    });
}
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppStore = ReturnType<typeof makeStore>