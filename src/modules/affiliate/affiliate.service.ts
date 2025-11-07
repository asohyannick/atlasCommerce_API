import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Affiliate } from "./entity/affiliate.entity";
import { CreateAffiliateDto } from "./dto/CreateAffiliateDto";
import { UpdateAffiliateDto } from "./dto/UpdateAffiliateDto";
@Injectable()
export class AffiliateService {
    constructor(@InjectModel(Affiliate.name) private readonly affiliateModel: Model<Affiliate>) {}

    async createAffiliate(createAffiliateDto: CreateAffiliateDto): Promise<Affiliate> {
        const affiliate = new this.affiliateModel(createAffiliateDto);
        return affiliate.save();
    }

    async getAllAffiliates(): Promise<Affiliate[]> {
        return this.affiliateModel.find().exec();
    }

    async getAffiliateById(id: string): Promise<Affiliate> {
        const affiliate = await this.affiliateModel.findById(id).exec();
        if (!affiliate) {
            throw new NotFoundException(`Affiliate with ID ${id} not found`);
        }
        return affiliate;
    }

    async updateAffiliate(id: string, updateAffiliateDto: UpdateAffiliateDto): Promise<Affiliate> {
        const affiliate = await this.affiliateModel.findByIdAndUpdate(id, updateAffiliateDto, { new: true, runValidators: true }).exec();
        if (!affiliate) {
            throw new NotFoundException(`Affiliate with ID ${id} not found`);
        }
        return affiliate;
    }

    async deleteAffiliate(id: string): Promise<void> {
        const result = await this.affiliateModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Affiliate with ID ${id} not found`);
        }
    }
}