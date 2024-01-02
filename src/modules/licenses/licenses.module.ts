import { Module } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { LicensesController } from './licenses.controller';
import { License, LicenseSchema } from './entities/license.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: License.name, schema: LicenseSchema }]),
  ], controllers: [LicensesController],
  providers: [LicensesService],
})
export class LicensesModule { }
