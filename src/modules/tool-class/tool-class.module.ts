import { Module } from '@nestjs/common';
import { ToolClassService } from './tool-class.service';
import { ToolClassController } from './tool-class.controller';

@Module({
  controllers: [ToolClassController],
  providers: [ToolClassService],
})
export class ToolClassModule {}
