import { PartialType } from '@nestjs/mapped-types';
import { CreateToolClassDto } from './create-tool-class.dto';

export class UpdateToolClassDto extends PartialType(CreateToolClassDto) {}
