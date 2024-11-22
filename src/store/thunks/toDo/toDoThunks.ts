import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../../axiosAPI.ts';

export const addNewTask = createAsyncThunk<void, ITaskForm>(
  'toDo/assNewTask',
  async (taskToAdd) => {
  await axiosAPI.post('toDo.json', {...taskToAdd})
  }
);

export const fetchAllTasks = createAsyncThunk<ITask[], void>(
  'toDo/fetchAllTasks',
  async () => {
    const response: {data: ITaskAPI | null} = await axiosAPI<ITaskAPI | null>('toDo.json');
    if (response.data) {
      const tasksInObj = response.data;
      return Object.keys(tasksInObj).map((taskId) => {
        return {
          ...tasksInObj[taskId],
          id: taskId,
        };
      });
    }
    return [];
  }
)