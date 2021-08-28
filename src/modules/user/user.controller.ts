import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { SignUpUserDto } from './dto/signUp.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBody({
    type: () => SignUpUserDto,
  })
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
