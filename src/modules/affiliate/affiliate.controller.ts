import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Affiliate } from './entity/affiliate.entity';
import { AffiliateService } from "./affiliate.service";
import { CreateAffiliateDto } from "./dto/CreateAffiliateDto";
import { UpdateAffiliateDto } from "./dto/UpdateAffiliateDto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { UserRole } from "../../common/enum/roles.enum";

@ApiTags('Affiliate Management Endpoints')
@Controller('affiliates')
export class AffiliateController {
    constructor(private readonly affiliateService: AffiliateService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Post('create-affiliate')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Affiliate created successfully", type: Affiliate })
    async createAffiliate(@Body() createAffiliateDto: CreateAffiliateDto): Promise<Affiliate> {
        return this.affiliateService.createAffiliate(createAffiliateDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('fetch-affiliates')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "All affiliates retrieved successfully", type: [Affiliate] })
    async getAllAffiliates(): Promise<Affiliate[]> {
        return this.affiliateService.getAllAffiliates();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('fetch-affiliate/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Affiliate retrieved successfully", type: Affiliate })
    async getAffiliateById(@Param('id') id: string): Promise<Affiliate> {
        return this.affiliateService.getAffiliateById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Put('update-affiliate/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Affiliate updated successfully", type: Affiliate })
    async updateAffiliate(@Param('id') id: string, @Body() updateAffiliateDto: UpdateAffiliateDto): Promise<Affiliate> {
        return this.affiliateService.updateAffiliate(id, updateAffiliateDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Delete('delete-affiliate/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Affiliate deleted successfully" })
    async deleteAffiliate(@Param('id') id: string): Promise<void> {
        return this.affiliateService.deleteAffiliate(id);
    }
}