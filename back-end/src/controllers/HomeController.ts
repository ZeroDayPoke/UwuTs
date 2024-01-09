import HomeService from "../services/HomeService";
import { NotFoundError, ServerError } from "../errors";
import { Request, Response, NextFunction } from "express";

class HomeController {
  async getAllHomes(req: Request, res: Response, next: NextFunction) {
    try {
      const homes = await HomeService.findAll();
      res.json(homes);
    } catch (err) {
      next(new ServerError("Server error while fetching homes"));
    }
  }

  async getHomeById(req, res, next) {
    try {
      const home = await HomeService.findById(req.params.id);
      if (!home) {
        throw new NotFoundError("Home not found");
      }
      res.json(home);
    } catch (err) {
      next(
        err instanceof NotFoundError
          ? err
          : new ServerError("Server error while fetching home")
      );
    }
  }

  async createHome(req, res) {
    try {
      const newHome = await HomeService.create(req.body);
      res.json({ valid: true, home: newHome });
    } catch (error) {
      throw new ServerError("Error saving the home data");
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
      throw new ServerError("Error updating the home data");
    }
  }

  async deleteHome(req, res) {
    try {
      const deletedHome = await HomeService.delete(req.params.id);
      res.json({ valid: true, message: "Home deleted" });
    } catch (error) {
      throw new ServerError("Error deleting the home data");
    }
  }
}

export default new HomeController();
