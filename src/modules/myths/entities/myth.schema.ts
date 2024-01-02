import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MythDocument = HydratedDocument<Myth>;

@Schema({ id: true, timestamps: true })
export class Myth {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  isAdmin: boolean;
}

export const MythSchema = SchemaFactory.createForClass(Myth);
