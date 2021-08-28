import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserDto {
  @ApiProperty({ example: 'Some Name' })
  name: string;

  @ApiProperty({ example: 'mail@mail.com' })
  email: string;

  @ApiProperty({ example: 'supersecret' })
  password: string;
}
