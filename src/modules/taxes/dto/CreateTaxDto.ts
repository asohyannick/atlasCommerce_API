import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateTaxDto {
    @ApiProperty({ description: 'Name of the tax type', example: 'Sales Tax' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Rate of the tax type', example: 7.5 })
    @IsNumber()
    rate: number;
}
