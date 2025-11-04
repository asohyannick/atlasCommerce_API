import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Shipping } from "./entity/shipping.entity";
import { CreateShippingDto } from "./dto/createShippingDto";
import { UpdateShippingDto } from "./dto/updateShippingDto";
import { ShippingRateDto } from './dto/shippingRateDto';
@Injectable()
export class ShippingService {
    constructor(@InjectModel(Shipping.name) private readonly shippingModel: Model<Shipping>) { }

    async createShipping(createShippingDto: CreateShippingDto): Promise<Shipping> {
        const shipping = new this.shippingModel(createShippingDto);
        return shipping.save();
    }

    async getShipping(id: string): Promise<Shipping> {
        const shipping = await this.shippingModel.findById(id).exec();
        if (!shipping) {
            throw new NotFoundException(`Shipping option with ID ${id} not found`);
        }
        return shipping;
    }

    async updateShipping(id: string, updateShippingDto: UpdateShippingDto): Promise<Shipping> {
        const shipping = await this.shippingModel.findByIdAndUpdate(id, updateShippingDto, { new: true, runValidators: true }).exec();
        if (!shipping) {
            throw new NotFoundException(`Shipping option with ID ${id} not found`);
        }
        return shipping;
    }

    async deleteShipping(id: string): Promise<void> {
        const result = await this.shippingModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Shipping option with ID ${id} not found`);
        }
    }

    async getShippingRates(shippingRateDto: ShippingRateDto): Promise<any> {
        const { destinationZip, weight } = shippingRateDto;
        const rates: { carrier: string; rate: number; estimatedDelivery: number }[] = [];

        const carriers = [
            {
                name: 'Carrier A',
                baseRate: 5.00,
                ratePerPound: 2.00,
                estimatedDelivery: 5
            },
            {
                name: 'Carrier B',
                baseRate: 7.00,
                ratePerPound: 1.50,
                estimatedDelivery: 3
            },
            {
                name: 'Carrier C',
                baseRate: 10.00,
                ratePerPound: 3.00,
                estimatedDelivery: 7
            }
        ];

        for (const carrier of carriers) {
            const totalRate = carrier.baseRate + (carrier.ratePerPound * weight);
            rates.push({
                carrier: carrier.name,
                rate: parseFloat(totalRate.toFixed(2)),
                estimatedDelivery: carrier.estimatedDelivery
            });
        }

        return rates;
    }
}