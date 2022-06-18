import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatusEnum } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  tasks: Task[] = [];

  getTasks() {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getTasks();

    // do something with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const newTask = {
      id: uuid(),
      title,
      description,
      status: TaskStatusEnum.OPEN,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  updateTask(id, updateTaskDto: UpdateTaskDto): Task {
    const { title, description } = updateTaskDto;
    const task = this.getTaskById(id);

    if (title) task.title = title;
    if (description) task.description = description;

    return task;
  }

  updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Task {
    const { status } = updateTaskStatusDto;

    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): Task {
    const taskToDelete = this.getTaskById(id);

    this.tasks = this.tasks.filter((task) => task.id !== id);

    return taskToDelete;
  }
}
