import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Inventory extends Document {
    @Prop({ required: true, type: String })
    productId: string;

    @Prop({ required: true, type: Number })
    quantity: number;

    @Prop({ required: true, type: Date })
    lastUpdated: Date;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);