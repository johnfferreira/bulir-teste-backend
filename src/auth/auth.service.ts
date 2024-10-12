import { Dependencies, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login-response.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/entities/user/user.service';
import { UserNotFoundException } from 'src/entities/user/exception/usernoutfoundexception';
import { InvalidPasswordException } from './exception/invalidpasswordexception';

@Dependencies(UserService, JwtService)
@Injectable()
export class AuthService {
  
  constructor(
    private readonly userService:UserService,
    private readonly jwtService:JwtService
    ){}

  async sign(email:string,password:string):Promise<LoginResponse>{

        const aUSer = await this.userService.findByEmail(email);
        if(!aUSer) throw new UserNotFoundException('Senha ou email invalido');
         
        
        const isMatch = await bcrypt.compare(password, aUSer.password);
        if(!isMatch) throw new InvalidPasswordException('Senha ou email invalido');

        const payload = { sub: aUSer.id, email: aUSer.email,role:aUSer.role};
     
        return{
          acess_token: await this.jwtService.signAsync(payload),
        }
  }
}
