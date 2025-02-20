import { Op } from "sequelize";
import CarDetailsService from "../services/carDetailsService.js";

export default class CarDetailsController {
  constructor() {
    this.carDetailsService = new CarDetailsService();
    this.updateAvailability = this.updateAvailability.bind(this);
  }

  async findAll(req, res) {
    try {
      const { make, model, year, fuel_type, available } = req.query;

      const options = { where: {} };

      if (make) options.where.make = { [Op.iLike]: `${make}%` };
      if (model) options.where.model = { [Op.iLike]: `${model}%` };
      if (year) options.where.year = Number(year);
      if (fuel_type) options.where.fuel_type = fuel_type;
      if (available !== undefined)
        options.where.available = available === "true";

      console.log(options);

      const carDetails = await this.carDetailsService.findAll(options);

      if (carDetails.length === 0) {
        return res.status(404).json({ message: "Nenhum carro encontrado" });
      }

      res.status(200).json(carDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar os carros" });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;

      const options = {};

      const carDetails = await this.carDetailsService.findById(id, options);

      if (!carDetails) {
        return res.status(404).json({ message: "Carro não encontrado" });
      }

      res.status(200).json(carDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar os detalhes do carro" });
    }
  }

  async updateAvailability(req, res) {
    try {
      const { id } = req.params;
      const { available } = req.body;

      if (available === undefined) {
        return res.status(400).json({
          message: "'available' é obrigatório no corpo da requisição",
        });
      }

      const userId = req.headers.userid;

      if (!userId) {
        return res
          .status(403)
          .json({ message: "userId não encontrado nos headers" });
      }

      const car = await this.carDetailsService.findById(id);

      if (!car) {
        return res.status(404).json({ message: "Carro não encontrado" });
      }

      
      const updatedCar = await this.carDetailsService.updateAvailability(
        id,
        available,
        available === false ? userId : null
      );

      return res.status(200).json(updatedCar);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro ao atualizar a disponibilidade do carro" });
    }
  }
}