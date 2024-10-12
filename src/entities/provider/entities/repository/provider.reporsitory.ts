import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Provider } from "../provider.entity";

@Injectable()
export class ProviderRepository extends Repository<Provider>{}