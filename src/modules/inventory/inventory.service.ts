import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Inventory } from "./entity/inventory.entity";
import { UpdateInventoryDto } from './dto/UpdateInventoryDto';

@Injectable()
export class InventoryService {
    constructor(@InjectModel(Inventory.name) private readonly inventoryModel: Model<Inventory>) {}

    async getInventoryDetails(productId: string): Promise<Inventory> {
        const inventory = await this.inventoryModel.findOne({ productId }).exec();
        if (!inventory) {
            throw new NotFoundException(`Inventory for product ID ${productId} not found`);
        }
        return inventory;
    }

    async updateInventory(productId: string, updateInventoryDto: UpdateInventoryDto): Promise<void> {
        const inventory = await this.inventoryModel.findOneAndUpdate(
            { productId },
            { quantity: updateInventoryDto.quantity, lastUpdated: new Date() },
            { new: true, runValidators: true }
        ).exec();

        if (!inventory) {
            throw new NotFoundException(`Inventory for product ID ${productId} not found`);
        }
    }

    async getLowStockProducts(): Promise<Inventory[]> {
        return this.inventoryModel.find({ quantity: { $lt: 10 } }).exec(); 
    }
}