import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingZone, ShippingZoneSchema } from './entity/shippingZone.entity';
import { ShippingZoneController } from './shippingZone.controller';
import { ShippingZoneService } from './shippingZone.service';
import { AuthModule } from '../auth/auth.module';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: ShippingZone.name, schema: ShippingZoneSchema }]),
        AuthModule,
    ],
    controllers: [ShippingZoneController],
    providers: [ShippingZoneService],
    exports: [ShippingZoneService],
})
export class ShippingZoneModule {}