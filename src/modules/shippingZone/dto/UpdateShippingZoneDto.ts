import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateShippingZoneDto {
    @ApiProperty({ description: 'Updated name of the shipping zone', required: false })
    @IsString()
    name?: string;

    @ApiProperty({ description: 'Updated flat rate for the shipping zone', required: false })
    @IsNumber()
    flatRate?: number;
}