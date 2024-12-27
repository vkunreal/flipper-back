import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { exampleTodo } from '../example'

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: exampleTodo.title.description,
    example: exampleTodo.title.value,
    required: false,
  })
  title?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: exampleTodo.text.description,
    example: exampleTodo.text.value,
    required: false,
  })
  text?: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: exampleTodo.is_attach.description,
    example: exampleTodo.is_attach.value,
    required: false,
  })
  is_attach?: boolean

  @IsOptional()
  @IsEnum(['resolved', 'in_work', 'to_do', 'cancelled'], {
    message: 'status must be one of: resolved, in_work, to_do, cancelled',
  })
  @ApiProperty({
    description: exampleTodo.status.description,
    example: exampleTodo.status.value,
    enum: ['resolved', 'in_work', 'to_do', 'cancelled'],
    required: false,
  })
  status?: 'resolved' | 'in_work' | 'to_do' | 'cancelled'
}
