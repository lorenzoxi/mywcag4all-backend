import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Criterion } from '../../criterion/entities/criterion.schema';

export type GuidelineDocument = HydratedDocument<Guideline>;

@Schema({ id: true, timestamps: true })
export class Guideline {
  @Prop({ required: true, unique: true })
  index: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: "" })
  linkApply: string;

  @Prop({ required: true, default: "" })
  linkUnderstanding: string;

  @Prop({ required: true, default: true })
  isApplicable?: boolean;

  @Prop({ required: true, default: false })
  isMet?: boolean;

  @Prop({ type: mongoose.Schema.Types.Array })
  criteria: Criterion[];
}

export const GuidelineSchema = SchemaFactory.createForClass(Guideline);
