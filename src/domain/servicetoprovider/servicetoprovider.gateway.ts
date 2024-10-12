import { ServiceToprovider } from "./servicetoprovider";



export abstract class ServiceToproviderGateway {
   abstract findById(id: string): Promise<ServiceToprovider | null>;
   abstract  findAll(): Promise<ServiceToprovider[] | null>;
   abstract create(sv: ServiceToprovider): Promise<void>;
   abstract delete(id: string): Promise<void>;
}