import { Module } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { WebsiteController } from './website.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Website, WebsiteSchema } from 'src/modules/website/entities/website.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Website.name,
        useFactory: () => {
          const schema = WebsiteSchema;
          schema.post('findOneAndUpdate', async function () {
            //get the id of the updated document
            const id = this.getQuery()['_id'];

            //retrieve the website by id
            const website = await this.model.findById(id).exec();

            //check if all the criteria are met foreach of the wcag levels
            const isA = website.sections.every((section) => section.guidelines.every((guideline) => guideline.criteria.every((criterion) => criterion.wcagLevel === 'A' && criterion.isMet)));
            const isAA = website.sections.every((section) => section.guidelines.every((guideline) => guideline.criteria.every((criterion) => criterion.wcagLevel === 'AA' && criterion.isMet)));
            const isAAA = website.sections.every((section) => section.guidelines.every((guideline) => guideline.criteria.every((criterion) => criterion.wcagLevel === 'AAA' && criterion.isMet)));

            // calculate the number of overall tests foreach of the wcag levels
            const totalA = website.tests.filter((test) => test.wcagLevel === 'A').length;
            const totalAA = website.tests.filter((test) => test.wcagLevel === 'AA').length;
            const totalAAA = website.tests.filter((test) => test.wcagLevel === 'AAA').length;

            // calculate the number of met tests foreach of the wcag levels
            const metA = website.tests.filter((test) => test.isMet && test.wcagLevel === 'A').length;
            const metAA = website.tests.filter((test) => test.isMet && test.wcagLevel === 'AA').length;
            const metAAA = website.tests.filter((test) => test.isMet && test.wcagLevel === 'AAA').length;
            const notMetA = totalA - metA;
            const notMetAA = totalAA - metAA;
            const notMetAAA = totalAAA - metAAA;

            const totalMet = metA + metAA + metAAA;
            const totalNotMet = notMetA + notMetAA + notMetAAA;

            // calculate the number of applicable tests foreach of the wcag levels
            const applicableA = website.tests.filter((test) => test.isApplicable && test.wcagLevel === 'A').length;
            const applicableAA = website.tests.filter((test) => test.isApplicable && test.wcagLevel === 'AA').length;
            const applicableAAA = website.tests.filter((test) => test.isApplicable && test.wcagLevel === 'AAA').length;
            const notApplicableA = totalA - applicableA;
            const notApplicableAA = totalAA - applicableAA;
            const notApplicableAAA = totalAAA - applicableAAA;

            const totalApplicable = applicableA + applicableAA + applicableAAA;
            const totalNotApplicable = notApplicableA + notApplicableAA + notApplicableAAA;

            // the number of met tests foreach of the test categories (A, M, S)
            const metManual = website.tests.filter((test) => test.isMet && test.category === 'M').length;
            const metAutomated = website.tests.filter((test) => test.isMet && test.category === 'A').length;
            const metSemiAutomated = website.tests.filter((test) => test.isMet && test.category === 'S').length;

            //calculate the total score
            const score = metManual * 3 + metAutomated * 2 + metSemiAutomated * 1;

            const newResults = {
              isA,
              isAA,
              isAAA,
              totalA,
              totalAA,
              totalAAA,
              metA,
              metAA,
              metAAA,
              notMetA,
              notMetAA,
              notMetAAA,
              totalMet,
              totalNotMet,
              applicableA,
              applicableAA,
              applicableAAA,
              notApplicableA,
              notApplicableAA,
              notApplicableAAA,
              totalApplicable,
              totalNotApplicable,
              metManual,
              metAutomated,
              metSemiAutomated,
              score
            }

            website.results = newResults;
            website.score = score;
            website.wcagLevel = isAAA ? 'AAA' : isAA ? 'AA' : isA ? 'A' : 'N.A.';
            website.save();

          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [WebsiteController],
  providers: [WebsiteService],
})
export class WebsiteModule { }
