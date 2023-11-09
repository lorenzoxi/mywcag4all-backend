import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { Section } from '../../section/entities/section.schema';
import { User } from 'src/modules/user/entities/user.schema';

export type WebsiteDocument = HydratedDocument<Website>;


@Schema({ id: true, timestamps: true })
export class Website {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  is_public: boolean;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  level: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }],
    required: true,
  })
  user: Types.ObjectId;

  @Prop({ type: [{ type: [mongoose.Schema.Types.ObjectId], ref: Section.name }], default: [] }) //TODO: add default document
  sections: MongooseSchema.Types.Array;
}

export const WebsiteSchema = SchemaFactory.createForClass(Website);
