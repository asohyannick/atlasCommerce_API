import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
export class CreateAffiliateDto {
    @ApiProperty({ description: 'Name of the affiliate', example: 'John Doe' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Email of the affiliate', example: 'john.doe@example.com' })
    @IsString()
    email: string;

    @ApiProperty({ description: 'Phone number of the affiliate', example: '+1234567890', required: false })
    @IsOptional()
    @IsString()
    phone?: string;
}