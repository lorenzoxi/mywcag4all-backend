import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Criterion } from '../../criterion/entities/criterion.schema';

export type GuidelineDocument = HydratedDocument<Guideline>;

@Schema({ id: true, timestamps: true })
export class Guideline {
  @Prop({ required: true, unique: true })
  index: number;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: true })
  is_applicable: boolean;

  @Prop({ required: true, default: false })
  is_passed: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Criterion' }] })
  criteria: Criterion[];
}

export const GuidelineSchema = SchemaFactory.createForClass(Guideline);
