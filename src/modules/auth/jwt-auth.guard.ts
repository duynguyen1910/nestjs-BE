import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            console.log('No Authorization header or token found');
            throw new UnauthorizedException('No authorization token found');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET
            })
            request['user'] = payload;
            console.log(payload);

        } catch (error) {
            console.log(error)
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException('Token has expired. Please login again.');
            }

            throw new UnauthorizedException('Invalid token. Please try again.');
        }

        return true;
    }
}
