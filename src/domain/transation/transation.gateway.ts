import { Transation } from "./transation";


export abstract class TransationGateway {
   abstract  findAll(): Promise<Transation[] | null>;
   abstract create(transation: Transation): Promise<void>;
}