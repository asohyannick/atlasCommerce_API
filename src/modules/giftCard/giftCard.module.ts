import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GiftCard, GiftCardSchema } from './entity/giftcard.entity';
import { GiftCardController } from './giftCard.service';
import { GiftCardService } from './giftCard.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: GiftCard.name, schema: GiftCardSchema }]),
        AuthModule,
        UserModule,
    ],
    controllers: [GiftCardController],
    providers: [GiftCardService],
    exports: [GiftCardService],
})
export class GiftCardModule {}