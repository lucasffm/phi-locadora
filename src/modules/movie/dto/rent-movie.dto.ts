import { IsDefined } from 'class-validator';

export class RentMovieDto {
  @IsDefined({ message: 'O campo returnDate é obrigatório' })
  returnDate: Date;
}
