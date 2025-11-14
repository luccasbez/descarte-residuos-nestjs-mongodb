import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PontosService } from './pontos.service';
import { PontosController } from './pontos.controller';
import { Ponto, PontoSchema } from './schemas/ponto.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ponto.name, schema: PontoSchema }])],
  providers: [PontosService],
  controllers: [PontosController],
  exports: [PontosService],
})
export class PontosModule {}
