import { User } from "./user";


export abstract class UserGateway {
   abstract findById(id: string): Promise<User | null>;
   abstract findByEmail(email: string): Promise<User | null>;
   abstract  findAll(): Promise<User[] | null>;
   abstract create(user: User): Promise<User>;
   abstract update(id: string, user: Partial<User>): Promise<void>;
   abstract delete(id: string): Promise<void>;
}

