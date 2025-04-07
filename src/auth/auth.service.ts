import { User } from '@/user/entity/user.enity';
import { LoginDto, LoginResponseDto } from '@/user/user.dto';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        const payload = { email: user.email, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' })
        };
    }

    async refresh(refreshToken: string): Promise<LoginResponseDto> {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const newPayload = { email: payload.email, sub: payload.sub };

            return {
                access_token: this.jwtService.sign(newPayload),
                refresh_token: this.jwtService.sign(newPayload, { expiresIn: '7d' })
            };
        } catch (error) {
            throw new UnauthorizedException('Token de refresco inválido');
        }
    }

    private async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepo.findOne({ where: { email }, relations: ['role'] });
        if (!user) throw new NotFoundException('Usuario no encontrado');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new UnauthorizedException('Contraseña inválida');

        return user;
    }
}