import { configureStore } from "@reduxjs/toolkit";
import mock from './slices/mockReducer'

export const store = configureStore({
    reducer:
    {
        mock
    }
})