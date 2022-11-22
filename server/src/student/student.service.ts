/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { UpdateStudentInput } from './dto/update-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  // update(id: number, updateStudentInput: UpdateStudentInput) {
  //   return `This action updates a #${id} student`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} student`;
  // }
}
