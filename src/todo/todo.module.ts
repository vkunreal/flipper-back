import { Module } from '@nestjs/common'
import { TodoService } from './todo.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from './data/entity/todo.entity'
import { TodoController } from './todo.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
