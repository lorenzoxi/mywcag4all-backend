import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';

export type CriterionDocument = HydratedDocument<Criterion>;

@Schema({ id: true })
export class Criterion {

  @Prop({ required: true })
  index: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: "" })
  linkApply: string;

  @Prop({ required: true, default: "" })
  linkUnderstanding: string;

  @Prop({ required: true })
  wcagLevel: string;

  @Prop({ required: true, default: true })
  isApplicable?: boolean;

  @Prop({ required: true, default: false })
  isMet?: boolean;

  @Prop({ required: true, default: [], type: MongooseSchema.Types.Array })
  testsToMet?: [String]
}

export const CriterionSchema = SchemaFactory.createForClass(Criterion);
