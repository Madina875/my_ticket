import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ versionKey: false, timestamps: false })
export class Customer {
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

  @Prop()
  hashed_refresh_token: string;

  @Prop()
  birth_date: string;

  @Prop()
  gender: string;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);
