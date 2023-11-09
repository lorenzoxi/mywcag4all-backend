import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Myth, MythDocument } from 'src/modules/myths/entities/myth.schema';
import { Model } from 'mongoose';

@Injectable()
export class MythService {
  constructor(
    @InjectModel(Myth.name) private readonly model: Model<MythDocument>,
  ) {}

  async findAll() {
    return await this.model.find().exec();
  }
}
