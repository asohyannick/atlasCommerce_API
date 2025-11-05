import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Tax extends Document {
    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true, type: Number })
    rate: number;
}

export const TaxSchema = SchemaFactory.createForClass(Tax);