import { IsEnum } from 'class-validator';
import { TaskStatusEnum } from '../task.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
