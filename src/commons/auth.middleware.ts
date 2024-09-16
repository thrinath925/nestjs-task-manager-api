
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request... inggg');
    const authHeader = req.header('authorization');
    console.log(authHeader)
    if (!authHeader) {
      throw new HttpException('No auth token recived', HttpStatus.UNAUTHORIZED);
    }

    

    try{
      const bearerToken = authHeader.split(' ')[1];
      const decoded = jwt.verify(bearerToken!, 'temp_secret_key');
      console.log(decoded)
      req.body.userinfo = decoded
      next();
    }catch(err){
      throw new HttpException('invalid token or token expried', HttpStatus.UNAUTHORIZED);

    }
    
   
  }
}
