import HomeRepository from "../repositories/HomeRepository";
import { Home } from "../models";
import logger from "../middleware/logger";

class HomeService {
  async findAll(): Promise<Home[]> {
    try {
      return await HomeRepository.findAll();
    } catch (err) {
      logger.error(err.message);
    }
  }

  async findById(id: number): Promise<Home | null> {
    try {
      return await HomeRepository.findById(id);
    } catch (err) {
      logger.error(err.message);
    }
  }

  async create(homeData: any): Promise<Home> {
    try {
      return await HomeRepository.create(homeData);
    } catch (err) {
      logger.error(err.message);
    }
  }

  async update(id: number, homeData: any): Promise<Home | null> {
    try {
      const homeOrNull = await HomeRepository.findById(id);
      if (!homeOrNull || homeOrNull === void 0) {
        return null;
      } else return await HomeRepository.updateById(id, homeData);
    } catch (err) {
      logger.error(err.message);
    }
  }

  async delete(id: number) {
    try {
      return await HomeRepository.deleteById(id);
    } catch (err) {
      logger.error(err.message);
    }
  }
}

export default new HomeService();
