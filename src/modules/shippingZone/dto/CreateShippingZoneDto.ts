import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateShippingZoneDto {
    @ApiProperty({ description: 'Name of the shipping zone', example: 'North America' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Flat rate for the shipping zone', example: 10.0 })
    @IsNumber()
    flatRate: number;
}