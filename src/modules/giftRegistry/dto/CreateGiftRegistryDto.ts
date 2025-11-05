import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateGiftRegistryDto {
    @ApiProperty({ description: 'Name of the gift registry', example: 'Wedding Registry' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'User ID of the registry owner', example: '12345' })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'List of gifts in the registry', example: ['Gift 1', 'Gift 2'], required: false })
    @IsOptional()
    @IsArray()
    gifts?: string[];
}