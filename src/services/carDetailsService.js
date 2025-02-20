import CarDetailsRepository from "../repositories/carDetailsRepository.js";
import UserRepository from "../repositories/userRepository.js";

export default class CarDetailsService {
  constructor() {
    this.carDetailsRepository = new CarDetailsRepository();
    this.userRepository = new UserRepository();
  }

  async findAll(options) {
    return await this.carDetailsRepository.findAll(options);
  }

  async findById(id, options = {}) {
    options.where = { ...(options.where || {}), id };

    return await this.carDetailsRepository.findOne(options);
  }

  async updateAvailability(id, available, userId) {
    try {
      console.log(`Atualizando disponibilidade do carro com ID: ${id}`);

      const car = await this.carDetailsRepository.findOne({ where: { id } });

      if (!car) {
        throw new Error("Carro não encontrado");
      }

      if(userId){
        const user = await this.userRepository.findOne({
          where: { id: userId },
        });
           
        if (!user) {
          throw new Error("Usuário não encontrado");
        }
       
        if (!user.reservations) {
          user.reservations = [];
        }
        
        if (!available) {
          user.reservations.push(car.id);
          await user.save();     
        } else {
          const index = user.reservations.lastIndexOf(car.id)
          if (index !== -1) {
            user.reservations.splice(index, 1);
          }
          await user.save();
        }
      }

      car.available = available;
      car.userId = available ? null :userId;
      await car.save();
      return car;
    } catch (error) {
      console.error("Erro ao atualizar a disponibilidade:", error.message);
      throw new Error("Erro ao atualizar a disponibilidade");
    }
  }
}