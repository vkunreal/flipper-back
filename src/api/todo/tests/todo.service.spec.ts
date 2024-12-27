import { Test, TestingModule } from '@nestjs/testing'
import { TodoService } from '../todo.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Todo } from '../data/entity/todo.entity'
import { Repository } from 'typeorm'

describe('TodoService', () => {
  let service: TodoService
  let repo: Repository<Todo>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useClass: Repository,
        },
      ],
    }).compile()

    service = module.get<TodoService>(TodoService)
    repo = module.get<Repository<Todo>>(getRepositoryToken(Todo))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return all todos', async () => {
    const todos: Todo[] = [
      {
        id: 1,
        title: 'test',
        text: 'test',
        is_attach: false,
        status: 'in_work',
        date: new Date(),
      },
      {
        id: 2,
        title: 'test2',
        text: 'test2',
        is_attach: true,
        status: 'to_do',
        date: new Date(),
      },
    ]

    jest.spyOn(repo, 'find').mockResolvedValue(todos)

    const result = await service.findAll()

    expect(result).toEqual(todos)
  })
})
