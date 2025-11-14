export class CreatePontoDto {
  nome: string;
  bairro: string;
  tipo: 'publico' | 'privado';
  categoriasAceitas: string[];
  latitude: number;
  longitude: number;
}
