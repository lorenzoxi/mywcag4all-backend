import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Guideline } from '../../guideline/entities/guideline.schema';

export type SectionDocument = HydratedDocument<Section>;

@Schema({ id: true, timestamps: true })
export class Section {
  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guideline' }] })
  guidelines: Guideline[];

}

export const SectionSchema = SchemaFactory.createForClass(Section);
