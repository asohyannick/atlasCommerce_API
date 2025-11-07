import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../../modules/user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // ✅ Read the token from the 'accessToken' cookie
    const token = request.cookies['accessToken'];

    if (!token || typeof token !== 'string') {
      throw new UnauthorizedException("No token provided in cookies");
    }

    try {
      // ✅ Verify the token
      const payload: any = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      // ✅ Fetch the user from DB
      const user = await this.userService.fetchUser(payload.userId);
      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      // ✅ Attach user to request for downstream handlers
      request["user"] = user;

      return true;
    } catch (err) {
      console.error("JWT validation error:", err);
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}