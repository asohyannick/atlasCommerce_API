import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateContentDto {
    @ApiProperty({ description: 'Updated title of the content', required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ description: 'Updated body of the content', required: false })
    @IsOptional()
    @IsString()
    body?: string;

    @ApiProperty({ description: 'Updated tags for the content', required: false })
    @IsOptional()
    @IsString({ each: true })
    tags?: string[];
}