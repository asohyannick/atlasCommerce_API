import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { TicketStatus } from "../../../common/enum/ticket.enum";

export class CreateTicketDto {
    @ApiProperty({ description: 'ID of the user creating the ticket', example: '60d5ec49f3f1f8e3d0a0a1b1' })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'Subject of the support ticket', example: 'Issue with order #12345' })
    @IsString()
    subject: string;

    @ApiProperty({ description: 'Detailed description of the issue', example: 'I received the wrong item in my order.' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'Status of the ticket', enum: TicketStatus, default: TicketStatus.OPEN })
    @IsOptional()
    @IsEnum(TicketStatus)
    status?: TicketStatus;
}