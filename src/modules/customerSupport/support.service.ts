import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { SupportTicket } from "./entity/supportTicket.entity";
import { CreateTicketDto } from "./dto/CreateTicketDto";
import { UpdateTicketDto } from "./dto/UpdateTicketDto";

@Injectable()
export class SupportService {
    constructor(@InjectModel(SupportTicket.name) private readonly supportTicketModel: Model<SupportTicket>) {}

    async createTicket(createTicketDto: CreateTicketDto): Promise<SupportTicket> {
        const ticket = new this.supportTicketModel(createTicketDto);
        return ticket.save();
    }

    async getTicket(id: string): Promise<SupportTicket> {
        const ticket = await this.supportTicketModel.findById(id).exec();
        if (!ticket) {
            throw new NotFoundException(`Support ticket with ID ${id} not found`);
        }
        return ticket;
    }

    async getUserTickets(userId: string): Promise<SupportTicket[]> {
        return this.supportTicketModel.find({ userId }).exec();
    }

    async updateTicket(id: string, updateTicketDto: UpdateTicketDto): Promise<SupportTicket> {
        const ticket = await this.supportTicketModel.findByIdAndUpdate(id, updateTicketDto, { new: true, runValidators: true }).exec();
        if (!ticket) {
            throw new NotFoundException(`Support ticket with ID ${id} not found`);
        }
        return ticket;
    }

    async deleteTicket(id: string): Promise<void> {
        const result = await this.supportTicketModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Support ticket with ID ${id} not found`);
        }
    }
}