import { Op } from "sequelize";
import CarDetailsService from "../services/carDetailsService.js";

export default class CarDetailsController {
  constructor() {
    this.carDetailsService = new CarDetailsService();
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

  async rentCar(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userInfo.id;

      if (!userId) {
        return res
          .status(403)
          .json({ message: "user não encontrado nos headers" });
      }

      const car = await this.carDetailsService.findById(id);

      if (!car) {
        return res.status(404).json({ message: "Carro não encontrado" });
      }

      const updatedCar = await this.carDetailsService.updateAvailability(
        id,
        false,
        userId
      );

      return res.status(200).json(updatedCar);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro ao atualizar a disponibilidade do carro" });
    }
  }

  async returnCar(req, res) {
    try {
      const { id } = req.params;

      const userId = req.userInfo.id;

      if (!userId) {
        return res
          .status(403)
          .json({ message: "user não encontrado nos headers" });
      }

      const car = await this.carDetailsService.findById(id);

      if (!car) {
        return res.status(404).json({ message: "Carro não encontrado" });
      }

      const updatedCar = await this.carDetailsService.updateAvailability(
        id,
        true,
        null
      );

      return res.status(200).json(updatedCar);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro ao atualizar a disponibilidade do carro" });
    }
  }

  async cancelReservation(req, res) {
    try {
      const { id } = req.params;

      const userId = req.userInfo.id;

      if (!userId) {
        return res
          .status(403)
          .json({ message: "user não encontrado nos headers" });
      }

      const car = await this.carDetailsService.findById(id);

      if (!car) {
        return res.status(404).json({ message: "Carro não encontrado" });
      }

      const updatedCar = await this.carDetailsService.updateAvailability(
        id,
        true,
        userId
      );

      return res.status(200).json(updatedCar);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro ao atualizar a disponibilidade do carro" });
    }
  }

  async getReservedCars(req, res) {
    try {
      const userId = req.userInfo.id;

      if (!userId) {
        return res.status(403).json({ message: "Usuário não autenticado" });
      }

      console.log(userId)

      
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      
      const reservedCars = await this.carDetailsRepository.findAll({
        where: { userId: userId },
      });

      
      if (reservedCars.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum carro reservado encontrado" });
      }

      return res.status(200).json(reservedCars);
    } catch (error) {
      console.error("Erro ao obter carros reservados:", error);
      return res
        .status(500)
        .json({ message: "Erro ao recuperar carros reservados" });
    }
  }

  async getMyReservations(req, res) {
    try {
      const userId = req.userInfo.id;

      if (!userId) {
        return res.status(403).json({ message: "Usuário não autenticado" });
      }
      
      const cars = await this.carDetailsRepository.findAll({ where: { userId: userId } });
      
      if (cars.length === 0) {
        return res.status(404).json({ message: "Carros não encontrados" });
      }
      
      return res.status(200).json({ reservations: cars });
    } catch (error) {
      console.error("Erro ao obter reservas do usuário:", error);
      return res
        .status(500)
        .json({ message: "Erro ao recuperar reservas do usuário" }); 
    }
  }
}