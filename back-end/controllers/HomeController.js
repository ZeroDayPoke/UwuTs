import HomeService from "../services/HomeService.js";

class HomeController {
  async getAllHomes(req, res) {
    try {
      const homes = await HomeService.findAll();
      res.json(homes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }

  async getHomeById(req, res) {
    try {
      const home = await HomeService.findById(req.params.id);
      if (!home) {
        return res.status(404).json({ error: "Home not found" });
      }
      res.json(home);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }

  async createHome(req, res) {
    try {
      const newHome = await HomeService.create(req.body);
      res.json({ valid: true, home: newHome });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error saving the home data" });
    }
  }

  async updateHome(req, res) {
    try {
      const updatedHome = await HomeService.update(req.params.id, req.body);
      if (!updatedHome[0]) {
        return res.status(404).json({ error: "Home not found" });
      }
      res.json({ valid: true, home: updatedHome });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating the home" });
    }
  }

  async deleteHome(req, res) {
    try {
      const deletedHome = await HomeService.delete(req.params.id);
      if (!deletedHome) {
        return res.status(404).json({ error: "Home not found" });
      }
      res.json({ valid: true, message: "Home deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting the home" });
    }
  }
}

export default new HomeController();
