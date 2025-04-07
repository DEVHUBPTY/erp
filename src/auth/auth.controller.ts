import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from '@/user/user.dto';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({
        summary: 'Iniciar sesión',
        description: 'Autentica al usuario y retorna tokens de acceso'
    })
    @ApiBody({
        type: LoginDto,
        description: 'Credenciales de usuario',
        examples: {
            example1: {
                value: {
                    email: 'usuario@ejemplo.com',
                    password: 'contraseña123'
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'Login exitoso',
        type: LoginResponseDto
    })
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
        return this.authService.login(loginDto);
    }

    @Post('refresh')
    @ApiOperation({
        summary: 'Refrescar token',
        description: 'Obtiene un nuevo token de acceso usando el token de refresco'
    })
    @ApiResponse({
        status: 200,
        description: 'Token refrescado exitosamente',
        type: LoginResponseDto
    })
    async refresh(@Body('refresh_token') refreshToken: string): Promise<LoginResponseDto> {
        return this.authService.refresh(refreshToken);
    }
}