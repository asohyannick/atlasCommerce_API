import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateTaxDto {
    @ApiProperty({ description: 'Updated name of the tax type', required: false })
    @IsString()
    name?: string;

    @ApiProperty({ description: 'Updated rate of the tax type', required: false })
    @IsNumber()
    rate?: number;
}