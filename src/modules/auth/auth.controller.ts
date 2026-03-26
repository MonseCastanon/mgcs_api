import { Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { UtilService } from "src/common/services/util.service";
import { AuthGuard } from "src/common/guards/auth.guard";
import { request } from "http";

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

        if (!user) 
            throw new UnauthorizedException("Usuario o contraseña incorrecta")

        const isValid = await this.utilSvc.checkPassword(password, user.password!);
        
        if (!isValid)
            throw new UnauthorizedException("El usuario y/o contraseña es incorrecto");
        
            // Obtener la información del usuario (payload)
            const { password: _pwd, username: _usr, ...payload } = user;

            // Generar el JWT
            const access_token = await this.utilSvc.generateJWT(payload);

            // Generar el Refresh Token
            const refresh_token = await this.utilSvc.generateJWT(payload, "7d");
            const hashRT = await this.utilSvc.hash(refresh_token);

            //FIXME: Asignar el hash al usuario
            await this.authScv.updateHash(user.id, hashRT);
            payload.hash = hashRT;

            // Devolver los tokens
            return {
                access_token,
                refresh_token: hashRT            
        }
    }
    
    // POST /auth/register

    @Get("/me")
    @UseGuards(AuthGuard)
    public getProfile(@Req() request: any) {
        const user = request['user'];
        return user;
    }

    @Post("/refresh")
    @UseGuards(AuthGuard)
    public async  refreshToken(@Req() request: any) {
        
        // Obtener el usuario ens seión
        const sessionUser = request['user'];
        const user = await this.authScv.getUserById(sessionUser.id);
        if (!user || user.hash) throw new ForbiddenException('Acceso Denegado');

        // Compararr le token recibido con el token guardado
        if (sessionUser.hash !== user.hash) throw new ForbiddenException('Token inválido');

        // Si el token es valido, generar nuevos tokens
        return {
            access_token: '',
            refresh_token: ''
        }

        // devolver el acces toke y refresh token. Moverlo a this.utilSvc.service
        
    }

    @Post("/logout")
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    public async logout(@Req() request: any) {
        const session = request['user'];
        await this.authScv.updateHash(session.id, null);
        return;
    }

    // ! git commit -a -m "bug: Corrección de inicio de sesión y configuración de rutas (me, logout, refresh)"
}