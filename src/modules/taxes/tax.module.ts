import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tax, TaxSchema } from './entity/tax.entity';
import { TaxController } from './tax.controller';
import { TaxService } from './tax.service';
import { AuthModule } from '../auth/auth.module';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Tax.name, schema: TaxSchema }]),
        AuthModule,
    ],
    controllers: [TaxController],
    providers: [TaxService],
    exports: [TaxService],
})
export class TaxModule {}