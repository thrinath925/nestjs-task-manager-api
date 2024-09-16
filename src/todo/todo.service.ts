import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Todo } from './todo.entity';



interface UserInfo {
    userId: number;
    name: string;
    iat: number;
    exp: number;
  }


@Injectable()
export class TodoService {

    
    constructor(
        @InjectRepository(Todo)
        private todoReposity: Repository<Todo>,

    ){}

    findAll(userinfo:UserInfo) {
        console.log(userinfo)
        const {userId} = userinfo
        console.log(userId)
        return this.todoReposity.find({where:{userid: userId}});
    }

    create(title: string, prioritie: string,userinfo:UserInfo){
        const todo = new Todo();  
        todo.title = title;
        todo.prioritie = prioritie
        console.log(userinfo)
        const {userId} = userinfo
        console.log(userId)
        todo.userid = userId       
        return this.todoReposity.save(todo);
    }

    async update(id: number, isCompleted: boolean,userinfo:UserInfo){
        
       const {userId} = userinfo
        const todo = await this.todoReposity.findOne({where: {userid: userId,id:id}});
        if(todo){  
            todo.isCompleted = isCompleted;  
            return this.todoReposity.save(todo);  
        }
        return null; 
    }

   async delete(id:number,userinfo:UserInfo){

        const {userId} = userinfo
        const todo = await this.todoReposity.findOne({where: {userid: userId,id:id}});
        console.log(todo)

        if(!todo){
            return {message:"no task found"}
        }
        return await this.todoReposity.delete({userid: userId,id:id}).then(() => todo);
    }
}