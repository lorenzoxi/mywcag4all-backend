import { Injectable } from '@nestjs/common';
import { CreateGuidelineDto } from './dto/create-guideline.dto';
import { UpdateGuidelineDto } from './dto/update-guideline.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Guideline, GuidelineDocument } from 'src/modules/guideline/entities/guideline.schema';
import { Model } from 'mongoose';

@Injectable()
export class GuidelineService {
  constructor(
    @InjectModel(Guideline.name)
    private readonly model: Model<GuidelineDocument>,
  ) {}

  async findAll() {
    return await this.model.find().exec();
  }
}
