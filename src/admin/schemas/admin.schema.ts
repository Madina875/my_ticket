import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ versionKey: false, timestamps: false })
export class Admin {
  @Prop()
  full_name: string;

  @Prop({ required: true })
  email: string;

  // @Prop()
  // password: string;
  @Prop()
  hashed_password: string;

  @Prop()
  confirm_password: string;

  @Prop({ unique: true })
  phone_number: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  is_creator: boolean;

  @Prop({ type: String, required: false, default: null })
  hashed_refresh_token: string | null;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
