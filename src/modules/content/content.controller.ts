import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Content } from './entity/content.entity';
import { ContentService } from "./content.service";
import { CreateContentDto } from "./dto/CreateContentDto";
import { UpdateContentDto } from "./dto/UpdateContentDto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { UserRole } from "../../common/enum/roles.enum";

@ApiTags('Content Management Endpoints')
@Controller('api/content')
export class ContentController {
    constructor(private readonly contentService: ContentService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Post('create-content')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Content created successfully", type: Content })
    async createContent(@Body() createContentDto: CreateContentDto): Promise<Content> {
        return this.contentService.createContent(createContentDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('fetch-contents')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "All content retrieved successfully", type: [Content] })
    async getAllContent(): Promise<Content[]> {
        return this.contentService.getAllContent();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('fetch-content/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Content retrieved successfully", type: Content })
    async getContentById(@Param('id') id: string): Promise<Content> {
        return this.contentService.getContentById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Put('update-content/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Content updated successfully", type: Content })
    async updateContent(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto): Promise<Content> {
        return this.contentService.updateContent(id, updateContentDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Delete('delete-content/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Content deleted successfully" })
    async deleteContent(@Param('id') id: string): Promise<void> {
        return this.contentService.deleteContent(id);
    }
}