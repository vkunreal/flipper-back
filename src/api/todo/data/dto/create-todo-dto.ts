import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { exampleTodo } from '../example'

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: exampleTodo.title.description,
    example: exampleTodo.title.value,
    nullable: false,
  })
  title: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: exampleTodo.text.description,
    example: exampleTodo.text.value,
    nullable: true,
  })
  text?: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: exampleTodo.is_attach.description,
    example: exampleTodo.is_attach.value,
    nullable: true,
  })
  is_attach?: boolean

  @IsEnum(['resolved', 'in_work', 'to_do', 'cancelled'], {
    message: 'status must be one of: resolved, in_work, to_do, cancelled',
  })
  @ApiProperty({
    description: exampleTodo.status.description,
    example: exampleTodo.status.value,
    enum: ['resolved', 'in_work', 'to_do', 'cancelled'],
    nullable: false,
  })
  status: 'resolved' | 'in_work' | 'to_do' | 'cancelled'
}
