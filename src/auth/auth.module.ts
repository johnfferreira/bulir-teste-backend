import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/entities/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/jwt.config';

@Module({
  imports:[UserModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
