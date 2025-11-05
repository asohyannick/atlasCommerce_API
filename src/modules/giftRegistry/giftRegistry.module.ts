import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GiftRegistry, GiftRegistrySchema } from './entity/giftRegistry.entity';
import { GiftRegistryController } from './giftRegistry.controller';
import { GiftRegistryService } from './giftRegistry.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: GiftRegistry.name, schema: GiftRegistrySchema }]),
        AuthModule,
        UserModule,
    ],
    controllers: [GiftRegistryController],
    providers: [GiftRegistryService],
    exports: [GiftRegistryService],
})
export class GiftRegistryModule {}