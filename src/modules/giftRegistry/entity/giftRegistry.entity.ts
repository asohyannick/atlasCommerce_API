import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class GiftRegistry extends Document {
    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true, type: String })
    userId: string;

    @Prop({ type: [String], default: [] })
    gifts: string[];
}

export const GiftRegistrySchema = SchemaFactory.createForClass(GiftRegistry);