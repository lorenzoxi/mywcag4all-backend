import { Injectable } from '@nestjs/common';
import { Section, SectionDocument } from 'src/modules/section/entities/section.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(Section.name) private readonly model: Model<SectionDocument>,
  ) { }

  async findAll() {
    return await this.model.find().exec();
  }


  async findOne(index: string) {
    return await this.model.findOne({ index: index }).exec();
  }
}
