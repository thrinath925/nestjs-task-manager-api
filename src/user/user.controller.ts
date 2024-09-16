

import { Controller, Get, Post, Body} from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly UserService: UserService){}

    @Get()
    findAll(){
        return this.UserService.findAll();
    }

    @Post()
    create(
        @Body('name') name: string,
        @Body('password') password: string,


    ){
        return this.UserService.create(name,password);
    }

    @Post('/login')
    login(    
    @Body('name') name: string,
    @Body('password') password: string,){
        return this.UserService.login(name,password);

    }

   

 
}