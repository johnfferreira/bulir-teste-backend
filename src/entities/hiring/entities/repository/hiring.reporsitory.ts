import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Hiring } from "../hiring.entity";

@Injectable()
export class HiringRepository extends Repository<Hiring>{}