import Home from "../models/Home.js";

class HomeService {
  async findAll() {
    return await Home.findAll();
  }

  async findById(id) {
    return await Home.findByPk(id);
  }

  async create(homeData) {
    return await Home.create(homeData);
  }

  async update(id, homeData) {
    return await Home.update(homeData, {
      where: {
        id: id,
      },
    });
  }

  async delete(id) {
    return await Home.destroy({
      where: {
        id: id,
      },
    });
  }
}

export default new HomeService();
