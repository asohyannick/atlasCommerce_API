import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Affiliate, AffiliateSchema } from './entity/affiliate.entity';
import { AffiliateController } from './affiliate.controller';
import { AffiliateService } from './affiliate.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Affiliate.name, schema: AffiliateSchema }]),
        AuthModule,
        UserModule,
    ],
    controllers: [AffiliateController],
    providers: [AffiliateService],
    exports: [AffiliateService],
})
export class AffiliateModule {}