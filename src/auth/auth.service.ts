import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminDocument } from '../admin/schemas/admin.schema';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { AdminService } from '../admin/admin.service';
import { LoginAdminDto } from '../admin/dto/login-admin.dto';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
  ) {}

  async generateTokens(admin: AdminDocument) {
    const payload = {
      id: admin._id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.SECRET_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async registration(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findByEmail(createAdminDto.email);
    if (candidate) {
      throw new ConflictException('Bunday email tizimda mavjud.');
    }

    const admin = await this.adminService.create(createAdminDto);
    return { adminId: admin._id };
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const admin = await this.adminService.findByEmail(loginAdminDto.email);
    if (!admin) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const isValidPassword = await bcrypt.compare(
      loginAdminDto.password,
      admin.hashed_password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);
    admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);

    await admin.save();
    res.cookie('refreshToken', refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    return { adminId: admin._id, accessToken };
  }

  async logout(id: string, res: Response) {
    const admin = await this.adminService.findOne(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    admin.hashed_refresh_token = null;
    await admin.save();

    res.clearCookie('refresh_token');
    res.json({ message: 'Admin signed out successfully!' });
  }

  async refreshToken(id: string, req: Request, res: Response) {
    const token = req.cookies?.refreshToken;
    if (!token) {
      throw new BadRequestException('Token required');
    }

    const admin = await this.adminService.findOne(id);
    if (!admin || !admin.hashed_refresh_token) {
      throw new UnauthorizedException('Invalid admin or token');
    }

    const isMatch = await bcrypt.compare(token, admin.hashed_refresh_token);
    if (!isMatch) {
      throw new UnauthorizedException('Refresh token invalid');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(admin);

    admin.hashed_refresh_token = await bcrypt.hash(newRefreshToken, 7);
    await admin.save();

    res.cookie('refreshToken', newRefreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    return res.json({ message: 'Token refreshed successfully' });
  }
}
