import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { License, LicenseDocument } from 'src/modules/licenses/entities/license.schema';

@Injectable()
export class LicensesService {
  constructor(
    @InjectModel(License.name) private readonly model: Model<LicenseDocument>,
  ) {}

  async findAll() {
    return await this.model.find().exec();
  }
}
