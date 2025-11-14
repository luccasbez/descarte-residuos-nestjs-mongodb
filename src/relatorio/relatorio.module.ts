import { Module } from '@nestjs/common';
import { RelatorioService } from './relatorio.service';
import { RelatorioController } from './relatorio.controller';
import { PontosModule } from '../pontos/pontos.module';
import { DescartesModule } from '../descartes/descartes.module';

@Module({
  imports: [PontosModule, DescartesModule],
  providers: [RelatorioService],
  controllers: [RelatorioController],
})
export class RelatorioModule {}
