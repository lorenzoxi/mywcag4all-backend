import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ToolClassService } from './tool-class.service';
import { CreateToolClassDto } from './dto/create-tool-class.dto';
import { UpdateToolClassDto } from './dto/update-tool-class.dto';

@Controller('tool-classes')
export class ToolClassController {
  constructor(private readonly toolClassService: ToolClassService) { }

  @Get()
  findAll() {
    return this.toolClassService.findAll();
  }

}
