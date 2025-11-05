import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Inventory } from './entity/inventory.entity';
import { InventoryService } from "./inventory.service";
import { UpdateInventoryDto } from "./dto/UpdateInventoryDto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { UserRole } from "../../common/enum/roles.enum";

@ApiTags('Inventory Management Endpoints')
@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.CUSTOMER)
    @Get(':productId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Inventory details retrieved successfully", type: Inventory })
    async getInventoryDetails(@Param('productId') productId: string): Promise<Inventory> {
        return this.inventoryService.getInventoryDetails(productId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.CUSTOMER)
    @Post(':productId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Inventory updated successfully" })
    async updateInventory(@Param('productId') productId: string, @Body() updateInventoryDto: UpdateInventoryDto): Promise<void> {
        return this.inventoryService.updateInventory(productId, updateInventoryDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.CUSTOMER)
    @Get('low-stock')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Low stock products retrieved successfully", type: [Inventory] })
    async getLowStockProducts(): Promise<Inventory[]> {
        return this.inventoryService.getLowStockProducts();
    }
}