import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    color_index:0,
    color_list: ["#E09200","#FFA1A1","#C7C400","#009400","#00B2B2","#6E6EFF"],
    bgColorCode:"#E09200"
}

export const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    next: (state) => {
        if(state.color_index >= 5){
            state.color_index = 0;
        }else{
            state.color_index += 1;
        }
        state.bgColorCode = state.color_list[state.color_index]
    },
    previous: (state) => {
      if(state.color_index <= 0){
            state.color_index = 5;
        }else{
            state.color_index -= 1;
        }
        state.bgColorCode = state.color_list[state.color_index]
    },
    changeByColorCode: (state, action) => {
      state.bgColorCode = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { next, previous, changeByColorCode } = colorSlice.actions

export default colorSlice.reducer