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
import { Model } from 'mongoose';
import { UpdateWebsiteCriteriaDto } from './dto/update-website.dto';
import { GetWebsitesQueryDto } from './dto/read-website.dts';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectModel(Website.name) private readonly model: Model<WebsiteDocument>,
  ) { }

  async create(website: CreateWebsiteDto) {
    return await this.model.create([{ ...website }], {
      validateBeforeSave: true,
    });
  }

  async findAll(query: GetWebsitesQueryDto) {
    if (query.projection) {   //TODO: refactor this
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

  async findByUserId(id: string) {
    return await this.model.find({ 'user': id })
      .exec();
  }

  async update(id: string, payload: UpdateWebsiteDto) {
    return await this.model.findByIdAndUpdate(id, { ...payload });
  }

  async updateTest(id: string, test_index: string, payload: UpdateWebsiteTestDto) {
    return await this.model.findOneAndUpdate(
      { _id: id },
      { $set: { 'tests.$[i]': { ...payload } } },
      {
        arrayFilters: [{ 'i.index': test_index }],
        upsert: false
      },
    );
  }

  async updateTests(id: string, tests: UpdateWebsiteTestsDto) {
    return await this.model.findOneAndUpdate(
      { _id: id },
      { tests },
    );
  }

  async updateSections(id: string, sections: UpdateWebsiteSectionssDto) {
    return await this.model.findOneAndUpdate(
      { _id: id },
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
      { _id: id },
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
    //retrieve users by score in the Website collection //TODO:
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
