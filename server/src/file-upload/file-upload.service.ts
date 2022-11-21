/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';

import excelToJson = require('convert-excel-to-json');
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  getHelloFromFileUpload(): string {
    return 'File Upload working...';
  }

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async saveFile(file: any) {
    // Convert excel file to JSON array
    const excelFilePath = process.cwd() + '/uploads/' + file.originalname;
    const result = excelToJson({
      sourceFile: excelFilePath,
      columnToKey: {
        A: 'id',
        B: 'name',
        C: 'dob',
        D: 'email',
      },
    });

    // Remove the first element from the derived array => since its a index of column names
    result.Sheet1.shift();
    const userArrayDerived = result.Sheet1;
    console.log(userArrayDerived);

    let users;

    // Save users array to database
    try {
      users = await this.userRepository.save(userArrayDerived);
    } catch (error) {
      users = [];
      console.log(error);
    }

    return users;
  }
}
