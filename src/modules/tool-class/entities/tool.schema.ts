import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType, Types } from 'mongoose';

export type ToolClassDocument = HydratedDocument<ToolClass>;

@Schema({ id: true, timestamps: true })
export class ToolClass {
  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

}

export const ToolClassSchema = SchemaFactory.createForClass(ToolClass);
