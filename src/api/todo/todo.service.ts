import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTodoDto, Todo, UpdateTodoDto } from './data'
import { APIListResponse, SelectParams } from 'src/shared/model/response'
import { getListFromRepository } from 'src/shared/utils/listService'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll({
    limit,
    page,
    host,
  }: SelectParams): Promise<APIListResponse<Todo[]>> {
    const data = await getListFromRepository<Todo>({
      limit,
      page,
      host,
      repository: this.todoRepository,
    })

    return data
  }

  findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({ where: { id } })
  }

  create(todo: CreateTodoDto): Promise<Todo> {
    const date = new Date().toISOString()
    return this.todoRepository.save({ ...todo, date })
  }

  async update(id: number, todo: UpdateTodoDto): Promise<Todo> {
    await this.todoRepository.update(id, todo)
    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id)
  }
}
