import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from './entity/subscription.entity';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }]),
        AuthModule,
        UserModule,
    ],
    controllers: [SubscriptionController],
    providers: [SubscriptionService],
    exports: [SubscriptionService],
})
export class SubscriptionModule {}