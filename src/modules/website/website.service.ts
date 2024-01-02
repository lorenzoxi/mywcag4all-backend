import { Injectable } from '@nestjs/common';
import { CreateWebsiteDto } from './dto/create-website.dto';
import {
  UpdateWebsiteCriterionDto,
  UpdateWebsiteDto,
  UpdateWebsiteLevelDto,
  UpdateWebsiteScoreDto,
  UpdateWebsiteSectionssDto,
  UpdateWebsiteTestDto,
  UpdateWebsiteTestsDto,
} from './dto/update-website.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Website, WebsiteDocument } from 'src/modules/website/entities/website.schema';
import { Model, Types } from 'mongoose';
import { GetWebsitesQueryDto } from './dto/read-website.dts';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectModel(Website.name) private readonly model: Model<WebsiteDocument>,
  ) { }

  async create(website: CreateWebsiteDto) {
    const newWebsite = await this.model.create([{ ...website, user: new Types.ObjectId(`${website.user}`) }]);
    return newWebsite;
  }

  async findAll(query: GetWebsitesQueryDto) {
    if (query.projection) {
      return await this.model.find({}).select("-tests -user -sections").exec();
    } else {
      return await this.model.find({}).exec();
    }
  }

  async findAllTests(id: string) {
    return await this.model.findById(id).select("tests").exec();
  }

  async findAllAndOrder(ordering_type: string) {
    return await this.model.find({ order: { score: ordering_type } }).exec();
  }

  async findOne(id: string) {
    return await this.model.find({ _id: id }).exec();
  }

  async findResultsById(id: string) {
    return await this.model.findById({ _id: id }).select("results -_id").exec();
  }

  async findByUserId(id: string) {
    const res = await this.model.find({ 'user': new Types.ObjectId(`${id}`) }).populate({
      path: 'tests',
      populate: {
        path: 'tools',
        model: 'Tool',
        populate: {
          path: 'license',
          model: 'License'
        }
      }
    }).exec();

    return res;
  }

  async update(id: string, payload: UpdateWebsiteDto) {
    return await this.model.findByIdAndUpdate(id, { ...payload });
  }

  async updateTest(id: string, test_index: string, payload: UpdateWebsiteTestDto) {
    return await this.model.findOneAndUpdate(
      { _id: new Types.ObjectId(`${id}`) },
      { $set: { 'tests.$[i]': { ...payload } } },
      {
        arrayFilters: [{ 'i.index': test_index }],
        upsert: false
      },
    );
  }

  async updateTests(id: string, newTests: UpdateWebsiteTestsDto) {
    const tests = await this.model.findOneAndUpdate(
      { _id: new Types.ObjectId(`${id}`) },
      { tests: newTests },
    ).select("tests").exec();


    const sections = await this.model.findById(id).select("sections").exec();

    sections.sections.forEach(section => {
      section.guidelines.forEach(guideline => {

        guideline.criteria.forEach(criterion => {

          const testsToMet = criterion.testsToMet;

          let isMet = true;
          testsToMet.forEach(testToMet => {

            const testIndex = (tests.tests as any).findIndex(test => test.index === testToMet);

            const test = tests.tests[testIndex];
            if (test.isMet === false) {
              isMet = false;
            }
          });

          if(isMet){
            criterion.isMet = true;
          }

        });
      });
    });

    
    sections.markModified('sections')
    sections.save();

    return tests;

  }

  async updateSections(id: string, sections: UpdateWebsiteSectionssDto) {
    const newSections = await this.model.findOneAndUpdate(
      { _id: new Types.ObjectId(`${id}`) },
      { sections },
    );
  }

  async updateCriterion(
    id: string,
    section_index: string,
    guideline_index: string,
    criterion_index: string,
    payload: UpdateWebsiteCriterionDto,
  ) {
    return await this.model.findOneAndUpdate(
      { _id: new Types.ObjectId(`${id}`) },
      { $set: { 'sections.$[i].guidelines.$[j].criteria.$[k]': { ...payload } } },
      {
        arrayFilters: [
          { 'i.index': section_index },
          { 'j.index': guideline_index },
          { 'k.index': criterion_index },
        ],
        upsert: false
      },
    );
  }

  async updateLevel(id: string, payload: UpdateWebsiteLevelDto) {
    return await this.model.findOneAndUpdate({ _id: id }, { level: payload });
  }

  async updateScore(id: string, payload: UpdateWebsiteScoreDto) {
    return await this.model.findOneAndUpdate({ _id: id }, { score: payload });
  }

  async removeById(id: string) {
    return await this.model.findByIdAndDelete(id);
  }

  async retriveUsersByWebsitesScore() {
    return await this.model.aggregate([
      {
        $group: {
          _id: '$user',
          score: { $sum: '$score' },
        },
      },
      {
        $sort: {
          score: -1,
        },
      },
    ]);
  }



}
