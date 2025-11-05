import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Faq, FaqSchema } from './entity/faq.entity';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Faq.name, schema: FaqSchema }]),
        AuthModule,
        UserModule,
    ],
    controllers: [FaqController],
    providers: [FaqService],
    exports: [FaqService],
})
export class FaqModule {}