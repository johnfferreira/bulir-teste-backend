import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import ormconfig from './config';
import { addTransactionalDataSource } from "typeorm-transactional";
import { DataSource} from "typeorm";


export const ormConfig: TypeOrmModuleAsyncOptions = {

    useFactory: () => {

        return {
            type: 'mysql',
            host: ormconfig().host,
            port: ormconfig().port,
            username: ormconfig().username,
            password: ormconfig().password,
            database: ormconfig().database,
            entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
            // apenas em hambiente dev 
            synchronize: true,
            //apenas em hambiente dev
            // para prod: error ou flase
            logging: true,
            //apenas em hambiente dev
            //dropSchema: true,
        }
    },

    // para queries atómica (transational)
    async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },

}

