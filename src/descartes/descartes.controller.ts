import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { DescartesService } from './descartes.service';
import { CreateDescarteDto } from './dto/create-descarte.dto';

@Controller('descartes')
export class DescartesController {
  constructor(private readonly descartesService: DescartesService) {}

  @Post()
  create(@Body() dto: CreateDescarteDto) {
    return this.descartesService.create(dto);
  }

  @Get()
  findFiltered(
    @Query('pontoId') pontoId?: string,
    @Query('tipo') tipoResiduo?: string,
    @Query('usuario') usuario?: string,
    @Query('data') data?: string,
  ) {
    return this.descartesService.findFiltered({ pontoId, tipoResiduo: tipoResiduo, usuario, data });
  }
}
