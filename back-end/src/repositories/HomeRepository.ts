// ./repositories/HomeRepository.ts

import Home from "../models/Home";
import logger from "../middleware/logger";

class HomeRepository {
  async findAll(): Promise<Home[] | []> {
    try {
      return await Home.findAll();
    } catch (err) {
      logger.error(err.message);
    }
  }

  async findById(id: number): Promise<Home | null> {
    try {
      return await Home.findByPk(id);
    } catch (err) {
      logger.error(err.message);
    }
  }

  async create(homeData: any): Promise<Home> {
    try {
      return await Home.create(homeData);
    } catch (err) {
      logger.error(err.message);
    }
  }

  async updateById(id: number, homeData: any): Promise<Home> {
    try {
      const home = await Home.findByPk(id);
    } catch (err) {
      logger.error(err.message);
    }

    try {
      await Home.update(homeData, { where: { id } });
    } catch (err) {
      logger.error(err.message);
    }

    try {
      return await Home.findByPk(id);
    } catch (err) {
      logger.error(err.message);
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      await Home.findByPk(id);
    } catch (err) {
      logger.error(err.message);
    }
    try {
      await Home.destroy({ where: { id } });
    } catch (err) {
      logger.error(err.message);
    }
  }

  async deleteAll(): Promise<void> {
    try {
      await Home.destroy({ where: {} });
    } catch (err) {
      logger.error(err.message);
    }
  }
}

export default new HomeRepository();
