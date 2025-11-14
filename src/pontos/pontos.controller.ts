import { Controller, Post, Get, Body } from '@nestjs/common';
import { PontosService } from './pontos.service';
import { CreatePontoDto } from './dto/create-ponto.dto';

@Controller('pontos')
export class PontosController {
  constructor(private readonly pontosService: PontosService) {}

  @Post()
  create(@Body() dto: CreatePontoDto) {
    return this.pontosService.create(dto);
  }

  @Get()
  findAll() {
    return this.pontosService.findAll();
  }
}
