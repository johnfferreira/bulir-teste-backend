import { Customer } from "./customer";

export abstract class CustomerGateway
{
   abstract findById(id: string): Promise<Customer | null>;
   abstract  findAll(): Promise<Customer[] | null>;
   abstract create(customer: Customer): Promise<void>;
   abstract delete(id: string): Promise<void>;
}