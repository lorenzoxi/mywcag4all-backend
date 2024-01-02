import { PartialType } from '@nestjs/mapped-types';
import { CreateWebsiteDto } from './create-website.dto';
import { Criterion } from 'src/modules/criterion/entities/criterion.schema';
import { Test } from 'src/modules/test/entities/test.schema';
import { Section } from 'src/modules/section/entities/section.schema';

export class UpdateWebsiteDto {
  name: string;
  url: string;
  isPublic: boolean;
}

export class UpdateWebsiteTestDto {
  isMet: boolean;
  isApplicable: boolean;
}

export class UpdateWebsiteTestsDto {
  tests: Test[];
}

export class UpdateWebsiteCriteriaDto {
  criteria: Criterion[];
}

export class UpdateWebsiteScoreDto {
  score: number;
}

export class UpdateWebsiteLevelDto {
  level: string;
}

export class UpdateWebsiteSectionssDto {
  payload: Section[];
}

export class UpdateWebsiteCriterionDto {
  isMet: boolean;
  isApplicable: boolean;
}