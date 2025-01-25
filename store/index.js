import { configureStore } from "@reduxjs/toolkit";
import mock from './slices/mockReducer'
import mockAnswers from './slices/mockAnswerReducer'

export const store = configureStore({
    reducer:
    {
        mock,
        mockAnswers
    }
})