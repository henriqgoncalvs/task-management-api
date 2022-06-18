export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatusEnum;
}

export enum TaskStatusEnum {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
