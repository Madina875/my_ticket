import { Injectable } from '@nestjs/common';
import { CreateHumanCategoryDto } from './dto/create-human_category.dto';
import { UpdateHumanCategoryDto } from './dto/update-human_category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { HumanCategory } from './schemas/human_category.schema';
import { Model } from 'mongoose';

@Injectable()
export class HumanCategoryService {
  constructor(
    @InjectModel(HumanCategory.name)
    private readonly humanCategorySchema: Model<HumanCategory>,
  ) {}
  create(createHumanCategoryDto: CreateHumanCategoryDto) {
    return this.humanCategorySchema.create(createHumanCategoryDto);
  }

  findAll() {
    return this.humanCategorySchema.find();
  }

  findOne(id: string) {
    return this.humanCategorySchema.findById(id);
  }

  update(id: string, updateHumanCategoryDto: UpdateHumanCategoryDto) {
    return this.humanCategorySchema.findByIdAndUpdate(
      id,
      updateHumanCategoryDto,
      { new: true },
    );
  }

  remove(id: string) {
    return this.humanCategorySchema.findByIdAndDelete(id);
  }
}
