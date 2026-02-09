import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("api/auth")
export class AuthController {

    constructor(private authScv: AuthService) {}
    
    @Get("login")
    public login() {
        return this.authScv.login();
    }
    
}