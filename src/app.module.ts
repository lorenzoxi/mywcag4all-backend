import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CriterionModule } from './modules/criterion/criterion.module';
import { MythModule } from './modules/myths/myth.module';
import { Section } from './modules/section/entities/section.schema';
import { SectionModule } from './modules/section/section.module';
import { TestModule } from './modules/test/test.module';
import { ToolModule } from './modules/tool/tool.module';
import { UserModule } from './modules/user/user.module';
import { WebsiteModule } from './modules/website/website.module';
import { GuidelineModule } from './modules/guideline/guideline.module';
import { AuthModule } from './modules/auth/auth.module';
import { ToolClassModule } from './modules/tool-class/tool-class.module';
import { LicensesModule } from './modules/licenses/licenses.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27017', {
      dbName: 'mywcag4all',
      authSource: 'admin',
      autoCreate: true,
      autoIndex: true,
    }),
    CriterionModule,
    GuidelineModule,
    MythModule,
    SectionModule,
    TestModule,
    ToolModule,
    UserModule,
    WebsiteModule,
    AuthModule,
    ToolClassModule,
    LicensesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
