import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
export class UpdateFaqDto {
    @ApiProperty({ description: 'Updated question of the FAQ', required: false })
    @IsString()
    question?: string;

    @ApiProperty({ description: 'Updated answer to the FAQ', required: false })
    @IsString()
    answer?: string;
}