import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CriterionDocument = HydratedDocument<Criterion>;

@Schema({ id: true, timestamps: true })
export class Criterion {

  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  level: string;
}

export const CriterionSchema = SchemaFactory.createForClass(Criterion);
