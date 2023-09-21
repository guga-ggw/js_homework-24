export interface ITask {
  taskname: string;
  completed: boolean;
  _uuid?: string;
}
export interface ITodoList {
  isCompleted: boolean;
}