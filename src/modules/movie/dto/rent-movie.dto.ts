import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class RentMovieDto {
  @IsDefined({ message: 'O campo returnDate é obrigatório' })
  @ApiProperty()
  returnDate: Date;
}
