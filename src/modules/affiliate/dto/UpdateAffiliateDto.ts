import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateAffiliateDto {
    @ApiProperty({ description: 'Updated name of the affiliate', required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ description: 'Updated email of the affiliate', required: false })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiProperty({ description: 'Updated phone number of the affiliate', required: false })
    @IsOptional()
    @IsString()
    phone?: string;
}