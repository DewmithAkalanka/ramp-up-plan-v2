/* eslint-disable @typescript-eslint/ban-types */
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

  update(id: number, updateStudentInput: UpdateStudentInput): Promise<User> {
    this.userRepository.update(id, updateStudentInput);
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  remove(id: number): Promise<User> {
    this.userRepository.delete({ id: id });
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
