import { User, Role, Token } from "../models";
import { Op } from "sequelize";
import logger from "../middleware/logger";

interface CreateParams {
  name?: string;
  email: string;
  password: string;
  phone?: string;
  Roles?: Role[];
}

class UserRepository {
  async createUser(userData: CreateParams): Promise<User> {
    try {
      logger.info(`Creating user with params ${JSON.stringify(userData)}`);
      return await User.create(userData, {
        include: [Role],
      });
    } catch (err) {
      logger.error(err.message);
    }
  }

  async findById(id: number): Promise<User | null> {
    return User.findOne({
      where: { id },
    });
  }

  async findByToken(token: string, tokenType: string): Promise<User | null> {
    try {
      const tokenRecord = await Token.findOne({
        where: {
          token: token,
          type: tokenType,
          expiration: { [Op.gt]: new Date() },
        },
      });

      if (!tokenRecord) return null;

      return this.findById(tokenRecord.userId);
    } catch (err) {
      logger.error(err.message);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await User.findOne({
        where: { email },
      });
    } catch (err) {
      logger.error(err.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await User.findAll();
    } catch (err) {
      logger.error(err.message);
    }
    return User.findAll({
      attributes: ["id", "name", "email"],
      include: [Role],
    });
  }

  async updateUserById(id: number, userData: any): Promise<void> {
    try {
      logger.info(
        `Updating user with id ${id} with params ${JSON.stringify(userData)}`
      );
    } catch (err) {
      logger.error(err.message);
    }
    await User.update(userData, { where: { id } });
  }

  async deleteUserById(id: number): Promise<void> {
    try {
      logger.info(`Deleting user with id ${id}`);
    } catch (err) {
      logger.error(err.message);
    }
    await User.destroy({ where: { id } });
  }
}

export default new UserRepository();
