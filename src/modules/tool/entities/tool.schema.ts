import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType, Types } from 'mongoose';

export type ToolDocument = HydratedDocument<Tool>;

@Schema({ id: true, timestamps: true })
export class Tool {
  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  license: string;

  @Prop()
  source_code: string;

  @Prop()
  tags: string[];

  @Prop()
  types: string[];
}

export const ToolSchema = SchemaFactory.createForClass(Tool);
