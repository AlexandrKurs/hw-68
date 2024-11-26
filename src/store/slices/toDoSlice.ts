import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addNewTask, changeTaskStatus, deleteTaskById, fetchAllTasks } from '../thunks/toDo/toDoThunks.ts';
import { RootState } from '../../app/store.ts';

interface ToDoState {
  tasks: ITask[];
  loadings: {
    fetching: boolean;
    add: boolean;
    delete:boolean;
    change: boolean;
  }
}

const initialState: ToDoState = {
  tasks: [],
  loadings: {
    fetching: false,
    add: false,
    delete: false,
    change: false,
  }
};

export const selectAddTaskLoading = (state: RootState) => state.toDo.loadings.add;
export const selectFetchTasksLoading = (state: RootState) => state.toDo.loadings.fetching;
export const selectDeleteTaskLoading = (state: RootState) => state.toDo.loadings.delete;
export const selectChangeTaskLoading = (state: RootState) => state.toDo.loadings.change;
export const selectAllTasks = (state: RootState) => state.toDo.tasks;

export const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewTask.pending, (state) => {
        state.loadings.add = true;
      })
      .addCase(addNewTask.fulfilled, (state) => {
        state.loadings.add = false;
      })
      .addCase(addNewTask.rejected, (state) => {
        state.loadings.add = false;
      })
      .addCase(fetchAllTasks.pending, (state) => {
        state.loadings.fetching = true;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
        state.loadings.fetching = false;
        state.tasks = action.payload.reverse();
      })
      .addCase(fetchAllTasks.rejected, (state) => {
        state.loadings.fetching = false;
      })
      .addCase(deleteTaskById.pending, (state) => {
        state.loadings.delete = true;
      })
      .addCase(deleteTaskById.fulfilled, (state) => {
        state.loadings.delete = false;
      })
      .addCase(deleteTaskById.rejected, (state) => {
        state.loadings.delete = false;
      })
      .addCase(changeTaskStatus.pending, (state) => {
        state.loadings.change = true;
      })
      .addCase(changeTaskStatus.fulfilled, (state) => {
        state.loadings.change = false;
      })
      .addCase(changeTaskStatus.rejected, (state) => {
        state.loadings.change = false;
      })
  }
});
export const toDoReducer = toDoSlice.reducer;
