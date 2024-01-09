import { User } from "../models/index.ts";
export default class UserRepository {
    createUser(userData: any): Promise<User>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    updateUserById(id: number, userData: any): Promise<void>;
    deleteUserById(id: number): Promise<void>;
}
//# sourceMappingURL=UserRepository.d.ts.map