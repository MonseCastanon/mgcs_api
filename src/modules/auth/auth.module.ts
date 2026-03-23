import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/common/services/prisma.service";
import { UtilService } from "src/common/services/util.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_ACCESS_SECRET'),
                signOptions: { expiresIn: '60s' },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, UtilService]
})
export class AuthModule { }