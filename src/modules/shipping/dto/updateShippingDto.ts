import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateShippingDto {
  @ApiProperty({ description: 'Updated name of the shipping option', example: 'Express Shipping', required: false })
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Updated description of the shipping option', required: false })
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Updated cost of the shipping option', required: false })
  @IsNumber()
  cost?: number;

  @ApiProperty({ description: 'Updated estimated delivery time in days', required: false })
  @IsNumber()
  estimatedDeliveryTime?: number;
}
