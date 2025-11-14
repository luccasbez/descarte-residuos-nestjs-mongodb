import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DescarteDocument = Descarte & Document;

@Schema({ timestamps: true })
export class Descarte {
  @Prop({ required: true })
  usuario: string;

  @Prop({ required: true })
  pontoId: string;

  @Prop({ required: true })
  tipoResiduo: string;

  @Prop({ required: true, default: Date.now })
  data: Date;
}

export const DescarteSchema = SchemaFactory.createForClass(Descarte);
