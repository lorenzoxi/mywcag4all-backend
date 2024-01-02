import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { Section } from '../../section/entities/section.schema';
import { User } from 'src/modules/user/entities/user.schema';
export type WebsiteDocument = HydratedDocument<Website>;
import jsonDefaultSections from '../../../../data/defaultSections.json';
import jsonDefaultTest from '../../../../data/defaultTests.json';
import { Test } from 'src/modules/test/entities/test.schema';

const defaultSections: Section[] = jsonDefaultSections as unknown as Section[];
const defaultTests: Test[] = jsonDefaultTest as unknown as Test[];

@Schema({ id: true, timestamps: true })
export class Website {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: false })
  isPublic: boolean;

  @Prop({ required: true, default: '' })
  url: string;

  @Prop({ required: true, default: 0 })
  score: number;

  @Prop({ required: true, default: '' })
  wcagLevel: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.Array, default: defaultSections })
  sections: [Section];

  @Prop({ type: mongoose.Schema.Types.Array, default: defaultTests })
  tests: [Test];

  @Prop({ type: mongoose.Schema.Types.Mixed, default: [] })
  results: { [key: string]: any };

}

export const WebsiteSchema = SchemaFactory.createForClass(Website);
