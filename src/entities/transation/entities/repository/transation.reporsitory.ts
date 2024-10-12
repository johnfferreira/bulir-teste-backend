import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Transation } from "../transation.entity";

@Injectable()
export class TransationRepository extends Repository<Transation>{}