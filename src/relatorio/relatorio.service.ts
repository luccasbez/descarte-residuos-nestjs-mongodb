import { Injectable } from '@nestjs/common';
import { PontosService } from '../pontos/pontos.service';
import { DescartesService } from '../descartes/descartes.service';

@Injectable()
export class RelatorioService {
  constructor(
    private readonly pontosService: PontosService,
    private readonly descartesService: DescartesService
  ) {}

  async gerarRelatorio() {
    const pontos = await this.pontosService.findAll();
    const descartes = await this.descartesService.getAll();

    const totalPontos = pontos.length;
    const totalUsuarios = new Set(descartes.map(d => d.usuario)).size;

    // ponto mais movimentado
    const contagemPorLocal: Record<string, number> = {};
    descartes.forEach(d => contagemPorLocal[d.pontoId] = (contagemPorLocal[d.pontoId] || 0) + 1);
    const maior = Object.entries(contagemPorLocal).sort((a,b) => b[1]-a[1])[0];
    const pontoMaisMovimentado = maior ? (pontos.find(p => p._id?.toString() === maior[0])?.nome || null) : null;

    // tipo mais descartado
    const contagemTipos: Record<string, number> = {};
    descartes.forEach(d => contagemTipos[d.tipoResiduo] = (contagemTipos[d.tipoResiduo] || 0) + 1);
    const tipoMaisDescartado = Object.entries(contagemTipos).sort((a,b)=>b[1]-a[1])[0]?.[0] || null;

    // média últimos 30 dias
    const now = new Date();
    const trintaDias = new Date(now);
    trintaDias.setDate(now.getDate() - 30);
    const ultimos30 = descartes.filter(d => new Date(d.data) >= trintaDias);
    const mediaDiaria = ultimos30.length / 30;

    // crescimento mês a mês
    const mesAtual = now.getMonth();
    const mesAnterior = mesAtual === 0 ? 11 : mesAtual - 1;
    const totalAtual = descartes.filter(d => new Date(d.data).getMonth() === mesAtual).length;
    const totalAnterior = descartes.filter(d => new Date(d.data).getMonth() === mesAnterior).length;
    const crescimento = totalAnterior === 0 ? null : ((totalAtual - totalAnterior) / totalAnterior) * 100;

    return {
      pontoMaisMovimentado,
      tipoMaisDescartado,
      mediaDiaria: Number(mediaDiaria.toFixed(2)),
      totalUsuarios,
      totalPontos,
      crescimentoPercentual: crescimento === null ? null : `${crescimento.toFixed(2)}%`
    };
  }
}
