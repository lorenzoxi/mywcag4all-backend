import { Module } from '@nestjs/common';
import { ToolClassService } from './tool-class.service';
import { ToolClassController } from './tool-class.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ToolClass, ToolClassSchema } from './entities/tool.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ToolClass.name, schema: ToolClassSchema }]),
  ],
  controllers: [ToolClassController],
  providers: [ToolClassService],
})
export class ToolClassModule { }
