import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from '../task-status.enum';

export class GetTasksFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search?: string;
}
