import { Controller, Post, Body, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { AuthService } from '../auth/auth.service';
import { LoginDTO, RegisterInfoDTO } from './user.dto';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('find')
  async find(@Body() body: any) {
    return await this.usersService.findOne(body.username);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() body: RegisterInfoDTO) {
    return await this.usersService.register(body);
  }

  @Post('login')
  @ApiBody({
    description: '用户登录',
    type: LoginDTO
  })
  async login(@Body() body: LoginDTO) {
    console.log(`JWT验证 - Step 1：用户请求登录`);
    const authResult = await this.authService.validateUser(
      body.username,
      body.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }
}
