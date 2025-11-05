import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateInventoryDto {
    @ApiProperty({ description: 'Quantity to update the inventory', example: 50 })
    @IsNumber()
    quantity: number;
}