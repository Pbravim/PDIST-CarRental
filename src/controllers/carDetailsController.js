import { Op } from "sequelize";
import CarDetailsService from "../services/carDetailsService.js";

export default class CarDetailsController {
  constructor() {
    this.carDetailsService = new CarDetailsService();
  }

  async findAll(req, res) {
    try {
      console.log(req.query)
      const { make, model, year, fuel, available = true, page = 1, limit = 10  } = req.query;
      
      const options = { where: {} };

      if (make) options.where.make = { [Op.iLike]: `${make}%` };
      if (model) options.where.model = { [Op.iLike]: `${model}%` };
      if (year) options.where.year = Number(year);
      if (fuel) options.where.fuel_type = fuel.toLowerCase();
      if (available) options.where.available = available;
      
      options.limit = limit;
      options.offset = (page - 1) * limit;
      console.log(options)

      const { rows: carDetails, count: total } = await this.carDetailsService.findAllWithPagination(options);

      const totalPages = Math.ceil(total / limit);

      res.status(200).json({
        carDetails: carDetails,
        pagination: {
          total,
          limit: limit,
          page: page,
          totalPages,
        },
      });
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

      if (!car.available) {
        return res.status(400).json({ message: "Carro já está reservado" });
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
        {carId: id},
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

      console.log(reservedCars)

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
      console.log(userId)
      const cars = await this.carDetailsService.findAll({ where: { userId: userId } });
      
      
      return res.status(200).json({ reservations: cars });
    } catch (error) {
      console.error("Erro ao obter reservas do usuário:", error);
      return res
        .status(500)
        .json({ message: "Erro ao recuperar reservas do usuário" }); 
    }
  }
}