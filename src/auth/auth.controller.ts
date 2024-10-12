import { Controller, Get, Post, Body,HttpCode, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignAuthDto } from './dto/sign-auth.dto';
import { Public } from './public.route';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post()
  sing(@Body() {email,password}:SignAuthDto){

       return this.authService.sign(email,password);
  }

  @Get()
  userReq(@Req() req){
   
       console.log("No controler: ",req.user)
  }



  
}
