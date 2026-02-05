import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {

    constructor(private authScv: AuthService) {}
    
    @Get()
    public login() {
        return this.authScv.login();
    }
    
}