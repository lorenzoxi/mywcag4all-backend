import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Tool } from 'src/modules/tool/entities/tool.schema';

export type TestDocument = HydratedDocument<Test>;

@Schema({ id: true, timestamps: true })
export class Test {
  @Prop({ required: true })
  index: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  purpose: string;

  @Prop({ required: true })
  procedure: string;

  @Prop({ required: true })
  wcagLevel: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, default: true })
  isApplicable: boolean;

  @Prop({ required: true, default: false })
  isMet: boolean;

  @Prop({ required: false, type: [Types.ObjectId], ref: 'Tool' })
  tools: Tool[];
}

export const TestSchema = SchemaFactory.createForClass(Test);
