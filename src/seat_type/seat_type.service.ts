import { Injectable } from '@nestjs/common';
import { CreateSeatTypeDto } from './dto/create-seat_type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SeatType } from './schemas/seat_type.schema';
import { Model } from 'mongoose';

@Injectable()
export class SeatTypeService {
  constructor(
    @InjectModel(SeatType.name)
    private readonly seatTypeSchema: Model<SeatType>,
  ) {}

  create(createSeatTypeDto: CreateSeatTypeDto) {
    return this.seatTypeSchema.create(createSeatTypeDto);
  }

  findAll() {
    return this.seatTypeSchema.find();
  }

  findOne(id: string) {
    return this.seatTypeSchema.findById(id);
  }

  update(id: string, updateSeatTypeDto: UpdateSeatTypeDto) {
    return this.seatTypeSchema.findByIdAndUpdate(id, updateSeatTypeDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.seatTypeSchema.findByIdAndDelete(id);
  }
}
