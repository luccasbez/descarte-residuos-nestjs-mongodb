import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DescartesService } from './descartes.service';
import { DescartesController } from './descartes.controller';
import { Descarte, DescarteSchema } from './schemas/descarte.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Descarte.name, schema: DescarteSchema }])],
  providers: [DescartesService],
  controllers: [DescartesController],
  exports: [DescartesService],
})
export class DescartesModule {}
