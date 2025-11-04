import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum } from 'class-validator';

export class CreateShippingDto {
  @ApiProperty({ description: 'Name of the shipping option', example: 'Standard Shipping' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the shipping option', example: 'Delivers in 5-7 business days' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Cost of the shipping option', example: 5.99 })
  @IsNumber()
  cost: number;

  @ApiProperty({ description: 'Estimated delivery time in days', example: 7 })
  @IsNumber()
  estimatedDeliveryTime: number;
}


