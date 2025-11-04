import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateContentDto {
    @ApiProperty({ description: 'Title of the content', example: 'My First Blog Post' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Body of the content', example: 'This is the content of the blog post.' })
    @IsString()
    body: string;

    @ApiProperty({ description: 'Tags for the content', example: ['blog', 'post'], required: false })
    @IsOptional()
    @IsString({ each: true })
    tags?: string[];
}
