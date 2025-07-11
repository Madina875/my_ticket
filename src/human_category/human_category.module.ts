import { Module } from '@nestjs/common';
import { HumanCategoryService } from './human_category.service';
import { HumanCategoryController } from './human_category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HumanCategory,
  HumanCategorySchema,
} from './schemas/human_category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HumanCategory.name,
        schema: HumanCategorySchema,
      },
    ]),
  ],
  controllers: [HumanCategoryController],
  providers: [HumanCategoryService],
})
export class HumanCategoryModule {}
