import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from './entity/content.entity';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
    ],
    controllers: [ContentController],
    providers: [ContentService],
    exports: [ContentService],
})
export class ContentModule {}