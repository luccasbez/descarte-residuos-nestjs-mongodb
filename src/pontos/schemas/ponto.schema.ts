import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PontoDocument = Ponto & Document;

@Schema({ timestamps: true })
export class Ponto {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  bairro: string;

  @Prop({ required: true, enum: ['publico', 'privado'] })
  tipo: string;

  @Prop({ type: [String], default: [] })
  categoriasAceitas: string[];

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;
}

export const PontoSchema = SchemaFactory.createForClass(Ponto);
