import { Model } from "sequelize";
interface TokenAttributes {
    id?: number;
    userId: number;
    token: string;
    type: string;
    expiration: Date;
}
declare class Token extends Model<TokenAttributes> implements TokenAttributes {
    id: number;
    userId: number;
    token: string;
    type: string;
    expiration: Date;
}
export default Token;
//# sourceMappingURL=Token.d.ts.map