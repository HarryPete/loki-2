const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
    name: 'mock',
    initialState: 
    {
        questions: [{ question: "",
            options: [
              { option: "", isCorrect: false },
              { option: "", isCorrect: false },
        ]}]
    },
    reducers:
    {
        updateQuestion(state, action)
        {
            const { index, question, options, answers } = action.payload
            state.questions[index] = { question, options, answers }
        },
        addNewQuestion(state, action)
        {
            const question = { question: "",
            options: [
              { option: "", isCorrect: false },
              { option: "", isCorrect: false },
            ]}
            state.questions.push(question)
        },
        removeQuestion(state, action)
        {
            const { index } = action.payload;
            state.questions.splice(index, 1)
        }
    }
})

export const { addNewQuestion, updateQuestion, removeQuestion } = slice.actions
export default slice.reducer