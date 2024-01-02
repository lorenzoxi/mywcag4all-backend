import { Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tool, ToolDocument } from 'src/modules/tool/entities/tool.schema';
import { Model } from 'mongoose';

@Injectable()
export class ToolService {
  constructor(
    @InjectModel(Tool.name) private readonly model: Model<ToolDocument>,
  ) { }

  async findAll() {
    return await this.model.find().populate('classes').populate('license').exec();
  }

  async findOneByShortName(shortName: string) {
    return await this.model.findOne({ shortName: shortName }).exec();
  }

}
