import { Module } from '@nestjs/common';
import { MythService } from './myth.service';
import { MythController } from './myth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Myth, MythSchema } from 'src/modules/myths/entities/myth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Myth.name, schema: MythSchema }]),
  ],
  controllers: [MythController],
  providers: [MythService],
})
export class MythModule {}
