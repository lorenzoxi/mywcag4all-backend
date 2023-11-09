import { Module } from '@nestjs/common';
import { GuidelineService } from './guideline.service';
import { GuidelineController } from './guideline.controller';
import { Guideline, GuidelineSchema } from 'src/modules/guideline/entities/guideline.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Guideline.name, schema: GuidelineSchema },
    ]),
  ],
  controllers: [GuidelineController],
  providers: [GuidelineService],
})
export class GuidelineModule {}
