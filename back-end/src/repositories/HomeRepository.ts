// ./repositories/HomeRepository.ts

import Home from "../models/Home";

class HomeRepository {
  async findAll(): Promise<Home[]> {
    return Home.findAll();
  }

  async findById(id: number): Promise<Home | null> {
    return Home.findByPk(id);
  }

  async create(homeData: any): Promise<Home> {
    return Home.create(homeData);
  }

  async updateById(id: number, homeData: any): Promise<void> {
    await Home.update(homeData, { where: { id } });
  }

  async deleteById(id: number): Promise<void> {
    await Home.destroy({ where: { id } });
  }
}

export default new HomeRepository();
