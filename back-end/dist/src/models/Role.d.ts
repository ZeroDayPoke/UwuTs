import { Model } from "sequelize";
interface RoleAttributes {
    id?: number;
    name: string;
}
declare class Role extends Model<RoleAttributes> implements RoleAttributes {
    id: number;
    name: string;
}
export default Role;
//# sourceMappingURL=Role.d.ts.map