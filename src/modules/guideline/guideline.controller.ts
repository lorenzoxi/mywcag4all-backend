import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { GuidelineService } from './guideline.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('guidelines')
export class GuidelineController {
  constructor(private readonly guidelineService: GuidelineService) {}

  @Get()
  //@UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.guidelineService.findAll();
  }
  
}
