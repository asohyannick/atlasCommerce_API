import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class SupportTicket extends Document {
    @Prop({ required: true, type: String })
    userId: string;

    @Prop({ required: true, type: String })
    subject: string;

    @Prop({ required: true, type: String })
    description: string;

    @Prop({ required: true, type: String, default: 'open' })
    status: string;
}

export const SupportTicketSchema = SchemaFactory.createForClass(SupportTicket);