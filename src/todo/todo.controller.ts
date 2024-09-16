import { Controller, Get, Post, Body, Put, Param, Delete,Headers,} from '@nestjs/common';
import { TodoService } from './todo.service';

interface UserInfo {
    userId: number;
    name: string;
    iat: number;
    exp: number;
  }

@Controller('todo')
export class TodoController {

    constructor(private readonly todoService: TodoService){}

    @Get()
    findAll(
        @Body('userinfo') userInfo:UserInfo

    ){
        console.log(userInfo,"----------")
        return this.todoService.findAll(userInfo);
    }

    @Post()
    create(
        @Body('title') title: string,
        @Body('prioritie') prioritie: string,
        @Body('userid') userid: number,
        @Body('userinfo') userInfo:UserInfo



    ){

        return this.todoService.create(title,prioritie,userInfo);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body('isCompleted') isCompleted: boolean,
        @Body('userinfo') userInfo:UserInfo,
        @Headers('authorization') authHeader: string,

    ){
        const token = authHeader.split(' ')[1]; 
        return this.todoService.update(id, isCompleted,userInfo);
    }

    @Delete(':id')
    delete(
        @Param('id') id:number,
        @Headers('authorization') authHeader: string,
        @Body('userinfo') userInfo:UserInfo,


    ){  
        const token = authHeader.split(' ')[1];
        return this.todoService.delete(id,userInfo);
    }
}