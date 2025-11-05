import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ShippingZone } from "./entity/shippingZone.entity";
import { CreateShippingZoneDto } from "./dto/CreateShippingZoneDto";
import { UpdateShippingZoneDto } from "./dto/UpdateShippingZoneDto";

@Injectable()
export class ShippingZoneService {
    constructor(@InjectModel(ShippingZone.name) private readonly shippingZoneModel: Model<ShippingZone>) {}

    async createShippingZone(createShippingZoneDto: CreateShippingZoneDto): Promise<ShippingZone> {
        const shippingZone = new this.shippingZoneModel(createShippingZoneDto);
        return shippingZone.save();
    }

    async getAllShippingZones(): Promise<ShippingZone[]> {
        return this.shippingZoneModel.find().exec();
    }

    async getShippingZoneById(id: string): Promise<ShippingZone> {
        const shippingZone = await this.shippingZoneModel.findById(id).exec();
        if (!shippingZone) {
            throw new NotFoundException(`Shipping zone with ID ${id} not found`);
        }
        return shippingZone;
    }

    async updateShippingZone(id: string, updateShippingZoneDto: UpdateShippingZoneDto): Promise<ShippingZone> {
        const shippingZone = await this.shippingZoneModel.findByIdAndUpdate(id, updateShippingZoneDto, { new: true, runValidators: true }).exec();
        if (!shippingZone) {
            throw new NotFoundException(`Shipping zone with ID ${id} not found`);
        }
        return shippingZone;
    }

    async deleteShippingZone(id: string): Promise<void> {
        const result = await this.shippingZoneModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Shipping zone with ID ${id} not found`);
        }
    }
}