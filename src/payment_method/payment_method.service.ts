import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaymentMethod } from './schemas/payment_method.schema';
import { Model } from 'mongoose';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod.name)
    private readonly paymentMethodShema: Model<PaymentMethod>,
  ) {}
  create(createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodShema.create(createPaymentMethodDto);
  }

  findAll() {
    return this.paymentMethodShema.find();
  }

  findOne(id: string) {
    return this.paymentMethodShema.findById(id);
  }

  update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.paymentMethodShema.findByIdAndUpdate(
      id,
      updatePaymentMethodDto,
      { new: true },
    );
  }

  remove(id: string) {
    return this.paymentMethodShema.findByIdAndDelete(id);
  }
}
