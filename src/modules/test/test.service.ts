import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { TestDocument } from 'src/modules/test/entities/test.schema';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Test.name) private readonly model: Model<TestDocument>,
  ) { }

  async findAll() {
    return await this.model.find().exec();
  }

  async findOneById(id: string) {
    return await this.model.findById(id).exec();
  }

  async findOneByIndex(index: string) {
    return await this.model.findOne({ index: index }).exec();
  }

}
