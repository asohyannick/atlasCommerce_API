import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Shipping extends Document {
  @Prop({  type: String })
  name: string;

  @Prop({  type: String })
  description: string;

  @Prop({  type: Number })
  cost: number;

  @Prop({  type: Number })
  estimatedDeliveryTime: number; 
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping);