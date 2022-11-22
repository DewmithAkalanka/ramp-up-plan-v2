/* eslint-disable prettier/prettier */
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { User } from 'src/entities/User.entity';
import { UpdateStudentInput } from './dto/update-student.input';

@Resolver(() => User)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => [User], { name: 'findAllStudents' })
  findAll() {
    return this.studentService.findAll();
  }

  @Query(() => User, { name: 'findStudentById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.findOne(id);
  }

  @Mutation(() => User, { name: 'updateStudent' })
  updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentService.update(
      updateStudentInput.id,
      updateStudentInput,
    );
  }

  @Mutation(() => User, { name: 'removeStudent' })
  removeStudent(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.remove(id);
  }
}
