import Home from "../models/Home.ts";
export default class HomeRepository {
    findAll(): Promise<Home[]>;
    findById(id: number): Promise<Home | null>;
    create(homeData: any): Promise<Home>;
    updateById(id: number, homeData: any): Promise<void>;
    deleteById(id: number): Promise<void>;
}
//# sourceMappingURL=HomeRepository.d.ts.map