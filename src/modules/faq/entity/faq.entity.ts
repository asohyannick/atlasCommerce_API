import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Faq extends Document {
    @Prop({ required: true, type: String })
    question: string;

    @Prop({ required: true, type: String })
    answer: string;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);