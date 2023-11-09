import {
  Controller,
  Get,
} from '@nestjs/common';
import { MythService } from './myth.service';

@Controller('myths')
export class MythController {
  constructor(private readonly mythService: MythService) {}

  @Get()
  findAll() {
    return this.mythService.findAll();
  }
}
