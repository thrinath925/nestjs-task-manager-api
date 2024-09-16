import { Injectable,UnauthorizedException  } from '@nestjs/common';


import { JwtService } from '@nestjs/jwt';


import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { user } from './user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(user)
        private userReposity: Repository<user>,
        private jwtService: JwtService, 

    ){}

    findAll() {
        return this.userReposity.find();
    }

    async  create(name: string, password:string){
        const new_user = new user();  
        new_user.name = name;
        const hashedPassword = await bcrypt.hash(password, 8);
        new_user.password = hashedPassword
        return this.userReposity.save(new_user); 
    }


    async login(name: string, password:string){
        const user = await this.userReposity.findOne({ where: { name } });

        if (user && await bcrypt.compare(password, user.password)) {
          const payload = { userId: user.id, name: user.name };
            const accessToken = this.jwtService.sign(payload);

          return accessToken;
        }
    
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
          }
    }


 
}