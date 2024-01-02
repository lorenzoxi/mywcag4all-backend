import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LicenseDocument = HydratedDocument<License>;

@Schema({ id: true, timestamps: true })
export class License {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;
}

export const LicenseSchema = SchemaFactory.createForClass(License);
