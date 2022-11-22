/* eslint-disable prettier/prettier */
// import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { User } from 'src/entities/User.entity';
// import { UpdateStudentInput } from './dto/update-student.input';

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

  // @Mutation(() => User)
  // updateStudent(
  //   @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  // ) {
  //   return this.studentService.update(
  //     updateStudentInput.id,
  //     updateStudentInput,
  //   );
  // }

  // @Mutation(() => User)
  // removeStudent(@Args('id', { type: () => Int }) id: number) {
  //   return this.studentService.remove(id);
  // }
}
