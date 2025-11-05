import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ShippingZone extends Document {
    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true, type: Number })
    flatRate: number;
}

export const ShippingZoneSchema = SchemaFactory.createForClass(ShippingZone);