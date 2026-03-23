import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/tasks/task.module';
import { UserModule } from './modules/user/user.module';
import { UtilService } from './common/services/util.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, TaskModule, UserModule],
  providers: [UtilService, JwtService]
})
export class AppModule { }
