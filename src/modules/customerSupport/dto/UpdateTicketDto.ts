import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { TicketStatus } from "../../../common/enum/ticket.enum";

export class UpdateTicketDto {
    @ApiProperty({ description: 'Updated subject of the support ticket', required: false })
    @IsOptional()
    @IsString()
    subject?: string;

    @ApiProperty({ description: 'Updated description of the issue', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Updated status of the ticket', enum: TicketStatus, required: false })
    @IsOptional()
    @IsEnum(TicketStatus)
    status?: TicketStatus;
}