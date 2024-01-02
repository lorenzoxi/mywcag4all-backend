import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType, Types } from 'mongoose';
import { License } from 'src/modules/licenses/entities/license.schema';
import { ToolClass } from 'src/modules/tool-class/entities/tool.schema';

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

  @Prop({ required: true, type: Types.ObjectId, ref: 'License' })
  license: License;

  @Prop({ required: false })
  sourceCode: string;

  @Prop({ required: false })
  tags: string[];

  @Prop({ required: true, type: [Types.ObjectId], ref: 'ToolClass' })
  classes: ToolClass[];
}

export const ToolSchema = SchemaFactory.createForClass(Tool);
