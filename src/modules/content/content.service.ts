import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Content } from "./entity/content.entity";
import { CreateContentDto } from "./dto/CreateContentDto";
import { UpdateContentDto } from "./dto/UpdateContentDto";

@Injectable()
export class ContentService {
    constructor(@InjectModel(Content.name) private readonly contentModel: Model<Content>) {}

    async createContent(createContentDto: CreateContentDto): Promise<Content> {
        const content = new this.contentModel(createContentDto);
        return content.save();
    }

    async getAllContent(): Promise<Content[]> {
        return this.contentModel.find().exec();
    }

    async getContentById(id: string): Promise<Content> {
        const content = await this.contentModel.findById(id).exec();
        if (!content) {
            throw new NotFoundException(`Content with ID ${id} not found`);
        }
        return content;
    }

    async updateContent(id: string, updateContentDto: UpdateContentDto): Promise<Content> {
        const content = await this.contentModel.findByIdAndUpdate(id, updateContentDto, { new: true, runValidators: true }).exec();
        if (!content) {
            throw new NotFoundException(`Content with ID ${id} not found`);
        }
        return content;
    }

    async deleteContent(id: string): Promise<void> {
        const result = await this.contentModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Content with ID ${id} not found`);
        }
    }
}