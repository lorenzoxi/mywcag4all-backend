import { Module } from '@nestjs/common';
import { CriterionService } from './criterion.service';
import { CriterionController } from './criterion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Criterion, CriterionSchema } from 'src/modules/criterion/entities/criterion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Criterion.name, schema: CriterionSchema },
    ]),
  ],
  controllers: [CriterionController],
  providers: [CriterionService],
})
export class CriterionModule {}
