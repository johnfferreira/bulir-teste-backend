import { Hiring } from "./hiring";


export abstract class HiringGateway {
   abstract findById(id: string): Promise<Hiring | null>;
   abstract  findAll(): Promise<Hiring[] | null>;
   abstract create(hiring: Hiring): Promise<void>;
   abstract delete(id: string): Promise<void>;
}