import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Tax } from "./entity/tax.entity";
import { CreateTaxDto } from "./dto/CreateTaxDto";
import { UpdateTaxDto } from './dto/UpdateTaxDto';

@Injectable()
export class TaxService {
    constructor(@InjectModel(Tax.name) private readonly taxModel: Model<Tax>) {}

    async createTax(createTaxDto: CreateTaxDto): Promise<Tax> {
        const tax = new this.taxModel(createTaxDto);
        return tax.save();
    }

    async getAllTaxes(): Promise<Tax[]> {
        return this.taxModel.find().exec();
    }

    async getTaxById(id: string): Promise<Tax> {
        const tax = await this.taxModel.findById(id).exec();
        if (!tax) {
            throw new NotFoundException(`Tax type with ID ${id} not found`);
        }
        return tax;
    }

    async updateTax(id: string, updateTaxDto: UpdateTaxDto): Promise<Tax> {
        const tax = await this.taxModel.findByIdAndUpdate(id, updateTaxDto, { new: true, runValidators: true }).exec();
        if (!tax) {
            throw new NotFoundException(`Tax type with ID ${id} not found`);
        }
        return tax;
    }

    async deleteTax(id: string): Promise<void> {
        const result = await this.taxModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Tax type with ID ${id} not found`);
        }
    }
}