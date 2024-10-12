import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Customer } from "../customer.entity";

@Injectable()
export class CustomerRepository extends Repository<Customer>{}