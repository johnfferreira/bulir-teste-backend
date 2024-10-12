import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Servicetoprovider } from "../servicetoprovider.entity";

@Injectable()
export class ServiceToProviderRepository extends Repository<Servicetoprovider>{}