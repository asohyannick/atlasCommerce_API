import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
export class ShippingRateDto {
  @ApiProperty({ description: 'Destination ZIP code', example: '10001' })
  @IsString()
  destinationZip: string;

  @ApiProperty({ description: 'Weight of the package in pounds', example: 2.5 })
  @IsNumber()
  weight: number;
}