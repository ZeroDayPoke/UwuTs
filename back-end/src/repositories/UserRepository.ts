import { User, Role, Token } from "../models";
import { Op } from "sequelize";

class UserRepository {
  async createUser(userData: any): Promise<User> {
    return User.create(userData);
  }

  async findById(id: number): Promise<User | null> {
    return User.findOne({
      where: { id },
      include: [{ model: Role, as: "Roles" }],
    });
  }

  async findByToken(token: string, tokenType: string): Promise<User | null> {
    const tokenRecord = await Token.findOne({
      where: {
        token: token,
        type: tokenType,
        expiration: { [Op.gt]: new Date() },
      },
    });

    if (!tokenRecord) return null;

    return this.findById(tokenRecord.userId);
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: { email },
      include: [{ model: Role, as: "Roles" }],
    });
  }

  async findAll(): Promise<User[]> {
    return User.findAll({
      attributes: ["id", "name", "email"],
      include: [Role],
    });
  }

  async updateUserById(id: number, userData: any): Promise<void> {
    await User.update(userData, { where: { id } });
  }

  async deleteUserById(id: number): Promise<void> {
    await User.destroy({ where: { id } });
  }
}

export default new UserRepository();
