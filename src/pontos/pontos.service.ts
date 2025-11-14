import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ponto, PontoDocument } from './schemas/ponto.schema';
import { CreatePontoDto } from './dto/create-ponto.dto';

@Injectable()
export class PontosService {
  constructor(@InjectModel(Ponto.name) private pontoModel: Model<PontoDocument>) {}

  async create(dto: CreatePontoDto) {
    const created = new this.pontoModel(dto);
    return created.save();
  }

  async findAll() {
    return this.pontoModel.find().exec();
  }

  async findById(id: string) {
    const p = await this.pontoModel.findById(id).exec();
    if (!p) throw new NotFoundException('Ponto não encontrado');
    return p;
  }
}
