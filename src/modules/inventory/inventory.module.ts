import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from './entity/inventory.entity';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { AuthModule } from '../auth/auth.module';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Inventory.name, schema: InventorySchema }]),
        AuthModule,
    ],
    controllers: [InventoryController],
    providers: [InventoryService],
    exports: [InventoryService],
})
export class InventoryModule {}