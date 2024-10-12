import { Provider } from "./provider";

export abstract class ProviderGateway
{
   abstract findById(id: string): Promise<Provider | null>;
   abstract  findAll(): Promise<Provider[] | null>;
   abstract create(provider: Provider): Promise<void>;
   abstract delete(id: string): Promise<void>;
}