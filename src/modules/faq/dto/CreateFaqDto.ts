import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFaqDto {
    @ApiProperty({ description: 'Question of the FAQ', example: 'What is your return policy?' })
    @IsString()
    question: string;

    @ApiProperty({ description: 'Answer to the FAQ', example: 'You can return items within 30 days of purchase.' })
    @IsString()
    answer: string;
}