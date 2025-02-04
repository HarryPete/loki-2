const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
    name: 'mockAnswers',
    initialState:
    {
        responses : []
    },
    reducers:
    {
        addAnswerTemplate(state, action)
        {
            const { length } = action.payload;
            Array.from({length}).forEach(()=>
            {
                state.responses.push([])
            })
        },
        updateAnswer(state, action)
        {
            const { index, answer } = action.payload
            const existingAnswers = state.responses[index];
            const updatedAnswers = [...existingAnswers, answer]
            state.responses[index] = updatedAnswers;
        },
        updateOptions(state, action)
        {
            const { index, option } = action.payload;
            const updatedAnswers = state.responses[index].filter((opt)=> opt !== option)
            state.responses[index] = updatedAnswers;
        },
        flagQuestion(state, action)
        {
            const { index, isFlagged } = action.payload;
            const answers = []
            state.responses[index] = { answers, isFlagged };
        },
        updateVerdict(state, action)
        {
            const { index, verdict } = action.payload;
            state.responses[index] = {...state.responses[index], verdict};
        }
    }
})

export const { addAnswerTemplate, updateAnswer, updateOptions, flagQuestion, updateVerdict } = slice.actions
export default slice.reducer