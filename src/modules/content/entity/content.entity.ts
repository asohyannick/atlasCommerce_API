import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class Content extends Document {
    @Prop({ required: true, type: String })
    title: string;

    @Prop({ required: true, type: String })
    body: string;

    @Prop({ type: [String] })
    tags: string[];
}

export const ContentSchema = SchemaFactory.createForClass(Content);