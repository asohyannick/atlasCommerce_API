import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";;
import { CreateShippingDto } from "./dto/createShippingDto";
import { UpdateShippingDto } from "./dto/updateShippingDto";
import { ShippingRateDto } from './dto/shippingRateDto';
import { ShippingService } from './shipping.service';
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { UserRole } from "../../common/enum/roles.enum";
@ApiTags('Shipping Management Endpoints')
@Controller('shippings')
export class ShippingController {
    constructor(private readonly shippingService: ShippingService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
    @Post('create-shipping')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Shipping option created successfully" })
    async createShipping(@Body() createShippingDto: CreateShippingDto) {
        const shipping = await this.shippingService.createShipping(createShippingDto);
        return { success: true, message: "Shipping option created successfully", data: shipping };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
    @Get('fetch-shipping/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Shipping option retrieved successfully" })
    async getShipping(@Param('id') id: string) {
        const shipping = await this.shippingService.getShipping(id);
        return { success: true, message: "Shipping option retrieved successfully", data: shipping };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
    @Put('update-shipping/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Shipping option updated successfully" })
    async updateShipping(@Param('id') id: string, @Body() updateShippingDto: UpdateShippingDto) {
        const shipping = await this.shippingService.updateShipping(id, updateShippingDto);
        return { success: true, message: "Shipping option updated successfully", data: shipping };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
    @Delete('delete-shipping/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Shipping option deleted successfully" })
    async deleteShipping(@Param('id') id: string) {
        await this.shippingService.deleteShipping(id);
        return { success: true, message: "Shipping option deleted successfully" };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
    @Post('ship-rates')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Shipping rates retrieved successfully" })
    async getShippingRates(@Body() shippingRateDto: ShippingRateDto) {
        const rates = await this.shippingService.getShippingRates(shippingRateDto);
        return { success: true, message: "Shipping rates retrieved successfully", data: rates };
    }
}