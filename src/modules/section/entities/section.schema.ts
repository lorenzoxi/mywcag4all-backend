import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooseSchema  } from 'mongoose';
import { Guideline } from '../../guideline/entities/guideline.schema';

export type SectionDocument = HydratedDocument<Section>;

@Schema({ id: true, timestamps: true })
export class Section {
  @Prop({ required: true })
  index: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.Array })
  guidelines: [Guideline];
}

export const SectionSchema = SchemaFactory.createForClass(Section);
