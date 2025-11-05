import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Tax } from './entity/tax.entity';
import { TaxService } from "./tax.service";
import { CreateTaxDto } from "./dto/CreateTaxDto";
import { UpdateTaxDto } from './dto/UpdateTaxDto';
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { UserRole } from "../../common/enum/roles.enum";

@ApiTags('Taxes Management Endpoints')
@Controller('api/taxes')
export class TaxController {
    constructor(private readonly taxService: TaxService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Post('add-tax')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Tax type created successfully", type: Tax })
    async createTax(@Body() createTaxDto: CreateTaxDto): Promise<Tax> {
        return this.taxService.createTax(createTaxDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('fetch-taxes')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "All tax types retrieved successfully", type: [Tax] })
    async getAllTaxes(): Promise<Tax[]> {
        return this.taxService.getAllTaxes();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('fetch-tax/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Tax type retrieved successfully", type: Tax })
    async getTaxById(@Param('id') id: string): Promise<Tax> {
        return this.taxService.getTaxById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Put('update-tax/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Tax type updated successfully", type: Tax })
    async updateTax(@Param('id') id: string, @Body() updateTaxDto: UpdateTaxDto): Promise<Tax> {
        return this.taxService.updateTax(id, updateTaxDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Delete('delete-tax/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Tax type deleted successfully" })
    async deleteTax(@Param('id') id: string): Promise<void> {
        return this.taxService.deleteTax(id);
    }
}