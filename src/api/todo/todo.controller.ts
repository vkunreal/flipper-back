import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateTodoDto, Todo, UpdateTodoDto } from './data'
import { TodoService } from './todo.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { APIListResponse } from 'src/shared/model/response'
import { getHost } from 'src/shared/utils/getHost'

@ApiTags('Todos')
@Controller('/api/v1/todos')
export class TodoV1Controller {
  constructor(private readonly todoService: TodoService) {}

  // GET TODOS
  @Get()
  @ApiOperation({ summary: 'Get all todos.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all todos.',
    type: [Todo],
  })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ): Promise<APIListResponse<Todo[]>> {
    const host = `${getHost()}/api/v1/todos`
    return this.todoService.findAll({
      page: Number(page),
      limit: Number(limit),
      host,
    })
  }

  // GET TODO BY ID
  @Get(':id')
  @ApiOperation({ summary: 'Get todo by id.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get todo by id.',
    type: Todo,
  })
  findOne(@Param('id') id: number): Promise<Todo> {
    return this.todoService.findOne(id)
  }

  // CREATE TODO
  @Post()
  @ApiOperation({ summary: 'Create todo.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create todo.',
    type: CreateTodoDto,
  })
  create(@Body() todo: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(todo)
  }

  // UPDATE TODO
  @Patch(':id')
  @ApiOperation({ summary: 'Update todo by id.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update todo by id.',
    type: UpdateTodoDto,
  })
  update(@Param('id') id: number, @Body() todo: UpdateTodoDto): Promise<Todo> {
    return this.todoService.update(id, todo)
  }

  // DELETE TODO
  @Delete(':id')
  @ApiOperation({ summary: 'Delete todo by id.' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete todo by id.',
  })
  delete(@Param('id') id: number): Promise<void> {
    return this.todoService.remove(id)
  }
}
