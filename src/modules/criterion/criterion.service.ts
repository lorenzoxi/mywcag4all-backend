import { Injectable } from '@nestjs/common';
import { CreateCriterionDto } from './dto/create-criterion.dto';
import { UpdateCriterionDto } from './dto/update-criterion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Criterion, CriterionDocument } from 'src/modules/criterion/entities/criterion.schema';
import { Model } from 'mongoose';

@Injectable()
export class CriterionService {
  constructor(
    @InjectModel(Criterion.name)
    private readonly model: Model<CriterionDocument>,
  ) {}


  findAll() {
    return `This action returns all criterion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} criterion`;
  }

}
