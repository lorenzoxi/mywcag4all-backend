import { Injectable } from '@nestjs/common';
import { ToolClass, ToolClassDocument } from './entities/tool.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ToolClassService {
  constructor(
    @InjectModel(ToolClass.name) private readonly model: Model<ToolClassDocument>,
  ) { }

  findAll() {
    return this.model.find().exec();
  }
}
