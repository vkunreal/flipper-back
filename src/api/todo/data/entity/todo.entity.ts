import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { exampleTodo } from '../example'

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @ApiProperty({
    description: exampleTodo.title.description,
    example: exampleTodo.title.value,
    nullable: false,
  })
  title: string

  @Column({ default: '' })
  @ApiProperty({
    description: exampleTodo.text.description,
    example: exampleTodo.text.value,
    nullable: true,
  })
  text: string

  @Column({ default: false })
  @ApiProperty({
    description: exampleTodo.is_attach.description,
    example: exampleTodo.is_attach.value,
    nullable: true,
  })
  is_attach: boolean

  @Column({ type: 'datetime' })
  @ApiProperty({
    description: exampleTodo.date.description,
    example: exampleTodo.date.value,
    nullable: false,
  })
  date: Date

  @Column()
  @ApiProperty({
    description: exampleTodo.status.description,
    enum: ['resolved', 'in_work', 'to_do', 'cancelled'],
    example: exampleTodo.status.value,
    nullable: false,
  })
  status: 'resolved' | 'in_work' | 'to_do' | 'cancelled'
}
