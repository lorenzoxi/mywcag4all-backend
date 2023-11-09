import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CriterionService } from './criterion.service';
import { CreateCriterionDto } from './dto/create-criterion.dto';
import { UpdateCriterionDto } from './dto/update-criterion.dto';

@Controller('criteria')
export class CriterionController {
  constructor(private readonly criterionService: CriterionService) {}

  @Get()
  findAll() {
    return this.criterionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.criterionService.findOne(+id);
  }
}
