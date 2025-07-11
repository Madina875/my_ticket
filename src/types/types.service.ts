import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Type } from './schemas/type.schema';
import { Model } from 'mongoose';

@Injectable()
export class TypesService {
  constructor(
    @InjectModel(Type.name) private readonly typesSchemas: Model<Type>,
  ) {}
  create(createTypeDto: CreateTypeDto) {
    return this.typesSchemas.create(createTypeDto);
  }

  findAll() {
    return this.typesSchemas.find();
  }

  findOne(id: string) {
    return this.typesSchemas.findById(id);
  }

  update(id: string, updateTypeDto: UpdateTypeDto) {
    return this.typesSchemas.findByIdAndUpdate(id, updateTypeDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.typesSchemas.findByIdAndDelete(id);
  }
}
