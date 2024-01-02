import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  //@UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.testService.findAll();
  }

  @Get(':id')
  //@UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.testService.findOneById(id);
  }
}
