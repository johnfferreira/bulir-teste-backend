import { JwtModuleAsyncOptions, JwtModuleOptions} from "@nestjs/jwt";

import jwtconfig from './config';
 
 export const jwtConfig: JwtModuleAsyncOptions = {

     useFactory: () => {
         return {
             global: true,
             secret: jwtconfig().secret_key,
             signOptions: { expiresIn: jwtconfig().expires_in }
         }
     }

 };