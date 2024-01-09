import { Model } from "sequelize";
interface HomeAttributes {
    id?: number;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    squareFootage: number;
    yearBuilt?: number;
    numberBathrooms: number;
    numberBedrooms: number;
    userId?: number;
}
declare class Home extends Model<HomeAttributes> implements HomeAttributes {
    id: number;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    squareFootage: number;
    yearBuilt: number | null;
    numberBathrooms: number;
    numberBedrooms: number;
    userId: number | null;
}
export default Home;
//# sourceMappingURL=Home.d.ts.map