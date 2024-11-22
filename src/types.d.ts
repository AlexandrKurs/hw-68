interface ITask {
  title: string;
  status: boolean;
  id?: string;
}

interface ITaskForm {
  title: string;
  status: boolean;
}

interface ITaskAPI {
  [id: string]: ICase;
}
