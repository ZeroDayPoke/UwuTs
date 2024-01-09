import HomeRepository from "../repositories/HomeRepository";

class HomeService {
  async findAll() {
    return HomeRepository.findAll();
  }

  async findById(id: number) {
    return await HomeRepository.findById(id);
  }

  async create(homeData: any) {
    return await HomeRepository.create(homeData);
  }

  async update(id: number, homeData: any) {
    return await HomeRepository.updateById(id, homeData);
  }

  async delete(id: number) {
    return await HomeRepository.deleteById(id);
  }
}

export default new HomeService();
