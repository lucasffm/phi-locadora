import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'mail@mail.com' })
  email: string;
  @ApiProperty({ example: 'supersecret' })
  password: string;
}
