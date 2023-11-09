import { Controller, Get, Param } from '@nestjs/common';
import { ToolService } from './tool.service';

@Controller('tools')
export class ToolController {
  constructor(private readonly toolService: ToolService) {} 

  @Get()
  findAll() {
    return this.toolService.findAll();
  }
  
  @Get(':shortName')
  findOnByShortName(@Param('shortName') short_name: string) {
    return this.toolService.findOneByShortName(short_name);
  }
}
