import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  task: {},
};

const taskSlice = createSlice({
  name: "taskslice",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = [...action.payload];
    },
    setTask: (state, action) => {
      state.task = action.payload;
    },
    removeTask: (state, action) => {
      console.log(action.payload);
      state.tasks.splice(action.payload, 1);
    },
  },
});

export const { setTasks, setTask, removeTask } = taskSlice.actions;

export default taskSlice.reducer;
