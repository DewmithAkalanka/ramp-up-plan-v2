import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateStudentInput {
  @Field(() => Int)
  id: number;
}
