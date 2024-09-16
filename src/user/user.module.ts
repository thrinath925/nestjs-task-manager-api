import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { user } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService],
  
  imports: [TypeOrmModule.forFeature([user]),
  JwtModule.register({
    secret: 'temp_secret_key', 
    signOptions: { expiresIn: '1h' }, 
  }),],


})
export class UserModule {}






