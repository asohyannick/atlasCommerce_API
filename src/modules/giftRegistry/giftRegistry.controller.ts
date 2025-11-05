import { Controller, Post, Get, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { GiftRegistryService } from "./giftRegistry.service";
import { CreateGiftRegistryDto } from "./dto/CreateGiftRegistryDto";
import { GiftRegistry } from "./entity/giftRegistry.entity";
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { UserRole } from "../../common/enum/roles.enum";

@ApiTags('Gift Registry Endpoints')
@Controller('gift-registries')
export class GiftRegistryController {
    constructor(private readonly giftRegistryService: GiftRegistryService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Post('create-gift-registry')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Gift registry created successfully", type: GiftRegistry })
    async createGiftRegistry(@Body() createGiftRegistryDto: CreateGiftRegistryDto): Promise<GiftRegistry> {
        return this.giftRegistryService.createGiftRegistry(createGiftRegistryDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('fetch-gift-registry/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Gift registry retrieved successfully", type: GiftRegistry })
    async getGiftRegistryById(@Param('id') id: string): Promise<GiftRegistry> {
        return this.giftRegistryService.getGiftRegistryById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('user/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "All gift registries for the user retrieved successfully", type: [GiftRegistry] })
    async getGiftRegistriesForUser(@Param('userId') userId: string): Promise<GiftRegistry[]> {
        return this.giftRegistryService.getGiftRegistriesForUser(userId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Delete('delete-gift-registry/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Gift registry deleted successfully" })
    async deleteGiftRegistry(@Param('id') id: string): Promise<void> {
        return this.giftRegistryService.deleteGiftRegistry(id);
    }
}