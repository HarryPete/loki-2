const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
    name: 'mock',
    initialState: 
    {
        questions: [{ question: "",
            options: [
              { option: "", isCorrect: false },
              { option: "", isCorrect: false },
        ],
        note: ""}]
    },
    reducers:
    {
        updateQuestion(state, action)
        {
            const { index, question, options, answers, note } = action.payload
            state.questions[index] = { question, options, answers, note }
        },
        addNewQuestion(state, action)
        {
            const question = { 
            question: "",
            options: [
              { option: "", isCorrect: false },
              { option: "", isCorrect: false },
            ],
            note: ""}
            state.questions.push(question)
        },
        removeQuestion(state, action)
        {
            const { index } = action.payload;
            state.questions.splice(index, 1)
        },
        feedMock(state, action)
        {
            const reference = action.payload;
            state.questions = reference
        }
    }
})

export const { addNewQuestion, updateQuestion, removeQuestion, feedMock } = slice.actions
export default slice.reducer