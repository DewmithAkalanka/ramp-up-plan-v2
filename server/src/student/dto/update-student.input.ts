import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateStudentInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Date, { nullable: true })
  dob?: Date;

  @Field(() => String, { nullable: true })
  email?: string;
}
