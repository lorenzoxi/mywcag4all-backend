import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { SectionService } from './section.service';

@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) { }

  // @Get()
  // findAll() {
  //   return this.sectionService.findAll();
  // }

  @Get()
  findAll() {
    return this.sectionService.findAll();
  }

  @Get(':index')
  findOne(@Param('index') index: string) {
    return this.sectionService.findOne(index);
  }
}
