import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TypesDocument = HydratedDocument<Type>;

@Schema({ versionKey: false, timestamps: false })
export class Type {
  @Prop()
  name: string;
}
export const TypeSchema = SchemaFactory.createForClass(Type);
