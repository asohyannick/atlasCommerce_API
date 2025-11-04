import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { SupportService } from "./support.service";
import { CreateTicketDto } from "./dto/CreateTicketDto";
import { SupportTicket } from "./entity/supportTicket.entity";
import { UpdateTicketDto } from "./dto/UpdateTicketDto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { UserRole } from "../../common/enum/roles.enum";
@ApiTags('Customer Support Management Endpoints')
@Controller('api/support/tickets')
export class SupportController {
    constructor(private readonly supportService: SupportService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Post('create-ticket')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Support ticket created successfully" })
    async createTicket(@Body() createTicketDto: CreateTicketDto): Promise<SupportTicket> {
        return this.supportService.createTicket(createTicketDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('fetch-ticket/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Support ticket retrieved successfully" })
    async getTicket(@Param('id') id: string): Promise<SupportTicket> {
        return this.supportService.getTicket(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('user/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "User's tickets retrieved successfully" })
    async getUserTickets(@Param('userId') userId: string): Promise<SupportTicket[]> {
        return this.supportService.getUserTickets(userId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Put('update-ticket/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Support ticket updated successfully" })
    async updateTicket(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto): Promise<SupportTicket> {
        return this.supportService.updateTicket(id, updateTicketDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Delete('delete-ticket/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Support ticket deleted successfully" })
    async deleteTicket(@Param('id') id: string): Promise<void> {
        return this.supportService.deleteTicket(id);
    }
}