import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportTicket, SupportTicketSchema } from './entity/supportTicket.entity';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: SupportTicket.name, schema: SupportTicketSchema }]),
        AuthModule,
        UserModule,
    ],
    controllers: [SupportController],
    providers: [SupportService],
})
export class SupportModule {}