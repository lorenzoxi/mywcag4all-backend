import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { WebsiteService } from './website.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  UpdateWebsiteCriterionDto,
  UpdateWebsiteDto,
  UpdateWebsiteLevelDto,
  UpdateWebsiteScoreDto,
  UpdateWebsiteSectionssDto,
  UpdateWebsiteTestDto,
  UpdateWebsiteTestsDto,
} from './dto/update-website.dto';
import { GetWebsitesQueryDto } from './dto/read-website.dts';

@Controller('websites')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createWebsiteDto: CreateWebsiteDto) {
    return this.websiteService.create(createWebsiteDto);
  }


  @Get()
  findAll(@Query() query: GetWebsitesQueryDto) {
    return this.websiteService.findAll(query);
  }

  @Get('sort_by/score:order')
  @UseGuards(AuthGuard('jwt'))
  findAllAndSort(@Param('order') ordering_type: string) {
    return this.websiteService.findAllAndOrder(ordering_type);
  }

  @Get('user/:id')
  @UseGuards(AuthGuard('jwt'))
  findById(@Param('id') id: string) {
    return this.websiteService.findOne(id);
  }

  @Get('user/:id')
  @UseGuards(AuthGuard('jwt'))
  findByUserId(@Param('id') id: string) {
    return this.websiteService.findByUserId(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  payload(@Param('id') id: string, @Body() updateWebsiteDto: UpdateWebsiteDto) {
    return this.websiteService.update(id, updateWebsiteDto);
  }

  @Patch(':id/tests/:test_index')
  @UseGuards(AuthGuard('jwt'))
  updateTest(
    @Param('id') id: string,
    @Param('test_index') test_index: string,
    @Body() updateWebsiteTestDto: UpdateWebsiteTestDto,
  ) {
    return this.websiteService.updateTest(id, test_index, updateWebsiteTestDto);
  }

  @Get(':id/tests')
  @UseGuards(AuthGuard('jwt'))
  findAllTests(
    @Param('id') id: string,
  ) {
    return this.websiteService.findAllTests(id);
  }

  @Patch(':id/sections/:section_index/guidelines/:guideline_index/criteria/:criterion_index')
  @UseGuards(AuthGuard('jwt'))
  updateCriterion(
    @Param('id') id: string,
    @Param('section_index') section_index: string,
    @Param('guideline_index') guideline_index: string,
    @Param('criterion_index') criterion_index: string,
    @Body() updateWebsiteCriterionDto: UpdateWebsiteCriterionDto,
  ) {
    return this.websiteService.updateCriterion(id, section_index, guideline_index, criterion_index, updateWebsiteCriterionDto);
  }

  @Put(':id/tests')
  @UseGuards(AuthGuard('jwt'))
  updateTests(@Param('id') id: string, @Body() updateWebsiteTestsDto: UpdateWebsiteTestsDto) {
    return this.websiteService.updateTests(id, updateWebsiteTestsDto);
  }

  @Put(':id/sections')
  @UseGuards(AuthGuard('jwt'))
  updateSections(@Param('id') id: string, @Body() updateWebsiteSectionssDto: UpdateWebsiteSectionssDto) {
    return this.websiteService.updateSections(id, updateWebsiteSectionssDto);
  }

  @Patch(':id/level')
  @UseGuards(AuthGuard('jwt'))
  updateLevel(@Param('id') id: string, @Body() updateWebsiteLevelDto: UpdateWebsiteLevelDto) {
    return this.websiteService.updateLevel(id, updateWebsiteLevelDto);
  }

  @Patch(':id/score')
  @UseGuards(AuthGuard('jwt'))
  updateScore(@Param('id') id: string, @Body() payload: UpdateWebsiteScoreDto) {
    return this.websiteService.updateScore(id, payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.websiteService.removeById(id);
  }
}
