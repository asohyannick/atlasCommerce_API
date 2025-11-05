import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ShippingZoneService } from "./shippingZone.service";
import { CreateShippingZoneDto } from "./dto/CreateShippingZoneDto";
import { ShippingZone } from "./entity/shippingZone.entity";
import { UpdateShippingZoneDto } from './dto/UpdateShippingZoneDto';
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { UserRole } from "../../common/enum/roles.enum";
import { Roles } from "../../common/decorators/roles.decorators";
@ApiTags('Shipping Zones Endpoints')
@Controller('shipping-zones')
export class ShippingZoneController {
    constructor(private readonly shippingZoneService: ShippingZoneService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Post('add-shipping-zone')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Shipping zone created successfully", type: ShippingZone })
    async createShippingZone(@Body() createShippingZoneDto: CreateShippingZoneDto): Promise<ShippingZone> {
        return this.shippingZoneService.createShippingZone(createShippingZoneDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('all-shipping-zones')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "All shipping zones retrieved successfully", type: [ShippingZone] })
    async getAllShippingZones(): Promise<ShippingZone[]> {
        return this.shippingZoneService.getAllShippingZones();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('fetch-shipping-zone/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Shipping zone retrieved successfully", type: ShippingZone })
    async getShippingZoneById(@Param('id') id: string): Promise<ShippingZone> {
        return this.shippingZoneService.getShippingZoneById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Put('update-shipping-zone/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Shipping zone updated successfully", type: ShippingZone })
    async updateShippingZone(@Param('id') id: string, @Body() updateShippingZoneDto: UpdateShippingZoneDto): Promise<ShippingZone> {
        return this.shippingZoneService.updateShippingZone(id, updateShippingZoneDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Delete('delete-shipping-zone/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Shipping zone deleted successfully" })
    async deleteShippingZone(@Param('id') id: string): Promise<void> {
        return this.shippingZoneService.deleteShippingZone(id);
    }
}