import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PontosModule } from './pontos/pontos.module';
import { DescartesModule } from './descartes/descartes.module';
import { RelatorioModule } from './relatorio/relatorio.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || '', {
      dbName: 'descarte'
    }),
    PontosModule,
    DescartesModule,
    RelatorioModule,
  ],
})
export class AppModule {}
