import { Injectable } from '@nestjs/common';
import { CreateTicketStatusDto } from './dto/create-ticket_status.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket_status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TicketStatus } from './schemas/ticket_status.schema';
import { Model } from 'mongoose';

@Injectable()
export class TicketStatusService {
  constructor(
    @InjectModel(TicketStatus.name)
    private readonly ticketStatusSchema: Model<TicketStatus>,
  ) {}
  create(createTicketStatusDto: CreateTicketStatusDto) {
    return this.ticketStatusSchema.create(createTicketStatusDto);
  }

  findAll() {
    return this.ticketStatusSchema.find();
  }

  findOne(id: string) {
    return this.ticketStatusSchema.findById(id);
  }

  update(id: string, updateTicketStatusDto: UpdateTicketStatusDto) {
    return this.ticketStatusSchema.findByIdAndUpdate(
      id,
      updateTicketStatusDto,
      { new: true },
    );
  }

  remove(id: string) {
    return this.ticketStatusSchema.findByIdAndDelete(id);
  }
}
