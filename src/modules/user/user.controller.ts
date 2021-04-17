import { Body, Controller, Post } from '@nestjs/common';
import { SignUpUserDto } from './dto/signUp.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('')
  async signUp(@Body() body: SignUpUserDto) {
    const data = await this.userService.signUp(body);
    delete data.password;
    return {
      data,
      message: 'Usuário criado com sucesso',
    };
  }
}
