import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Affiliate extends Document {
    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true, type: String })
    email: string;

    @Prop({ type: String })
    phone?: string;
}

export const AffiliateSchema = SchemaFactory.createForClass(Affiliate);