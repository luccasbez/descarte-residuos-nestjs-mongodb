import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Descarte, DescarteDocument } from './schemas/descarte.schema';
import { CreateDescarteDto } from './dto/create-descarte.dto';

@Injectable()
export class DescartesService {
  constructor(@InjectModel(Descarte.name) private descarteModel: Model<DescarteDocument>) {}

  async create(dto: CreateDescarteDto) {
    const toSave = {
      ...dto,
      data: dto.data ? new Date(dto.data) : new Date()
    };
    const created = new this.descarteModel(toSave);
    return created.save();
  }

  async findFiltered(filters: { pontoId?: string, tipoResiduo?: string, usuario?: string, data?: string }) {
    const query: any = {};
    if (filters.pontoId) query.pontoId = filters.pontoId;
    if (filters.tipoResiduo) query.tipoResiduo = filters.tipoResiduo;
    if (filters.usuario) query.usuario = filters.usuario;
    if (filters.data) {
      // match date (YYYY-MM-DD)
      const start = new Date(filters.data);
      const end = new Date(filters.data);
      end.setDate(end.getDate() + 1);
      query.data = { $gte: start, $lt: end };
    }
    return this.descarteModel.find(query).exec();
  }

  async getAll() {
    return this.descarteModel.find().exec();
  }
}
