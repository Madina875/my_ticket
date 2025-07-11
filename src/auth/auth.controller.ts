import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { LoginAdminDto } from '../admin/dto/login-admin.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.registration(createAdminDto);
  }

  @Post('login')
  async login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginAdminDto, res);
  }

  @Post('logout/:id')
  async signout(@Param('id') id: string, @Res() res: Response) {
    return this.authService.logout(id, res);
  }
}
