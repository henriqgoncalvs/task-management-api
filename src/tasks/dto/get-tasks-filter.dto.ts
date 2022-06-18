import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from '../task.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;

  @IsOptional()
  @IsString()
  search?: string;
}
