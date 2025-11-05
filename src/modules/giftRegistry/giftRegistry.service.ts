import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { GiftRegistry } from "./entity/giftRegistry.entity";
import { CreateGiftRegistryDto } from "./dto/CreateGiftRegistryDto";

@Injectable()
export class GiftRegistryService {
    constructor(@InjectModel(GiftRegistry.name) private readonly giftRegistryModel: Model<GiftRegistry>) {}

    async createGiftRegistry(createGiftRegistryDto: CreateGiftRegistryDto): Promise<GiftRegistry> {
        const giftRegistry = new this.giftRegistryModel(createGiftRegistryDto);
        return giftRegistry.save();
    }

    async getGiftRegistryById(id: string): Promise<GiftRegistry> {
        const giftRegistry = await this.giftRegistryModel.findById(id).exec();
        if (!giftRegistry) {
            throw new NotFoundException(`Gift registry with ID ${id} not found`);
        }
        return giftRegistry;
    }

    async getGiftRegistriesForUser(userId: string): Promise<GiftRegistry[]> {
        return this.giftRegistryModel.find({ userId }).exec();
    }

    async deleteGiftRegistry(id: string): Promise<void> {
        const result = await this.giftRegistryModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Gift registry with ID ${id} not found`);
        }
    }
}