import { Body, Controller, Get, HttpCode, HttpStatus, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { UtilService } from "src/common/services/util.service";

@Controller("api/auth")
export class AuthController {

    constructor(
        private readonly authScv: AuthService,
        private readonly utilSvc: UtilService
    ) {}
    
    @Post("/login")
    @HttpCode(HttpStatus.OK)
    public async login(@Body() login: LoginDto): Promise<any> {
        const { username, password } = login;

        const user = await this.authScv.getUserByUsername(username);

        if (!user) {
            throw new UnauthorizedException("Usuario o contraseña incorrecta")
        }

        if (await this.utilSvc.checkPassword(password, user.password!)) {
            // Obtener la información del usuario (payload)
            const { password, username, ...payload } = user;

            // Generar el JWT
            const access_token = await this.utilSvc.generateJWT(payload);

            // Generar el Refresh Token
            const refresh_token = await this.utilSvc.generateJWT(payload, "7d");

            // Devolver los tokens
            return {
                access_token,
                refresh_token
            }
        }
    }
    
    // POST /auth/register

    @Get("/me")
    public getProfile() {

    }

    @Post("/refresh")
    public refreshToken() {
        
    }

    @Post("/logout")
    public logout() {
        
    }
}