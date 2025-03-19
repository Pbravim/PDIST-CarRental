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

  async findAllWithPagination(options) {
    return await this.carDetailsRepository.findAllWithPagination(options);
  }

  async updateAvailability({carId, data_inicio, data_fim}, available, userId) {
    try {
      console.log(`Atualizando disponibilidade do carro com ID: ${carId}`);
      console.log(`usuário: ${userId}`)

      const car = await this.carDetailsRepository.findOne({ where: { carId } });

      if (!car) {
        throw new Error("Carro não encontrado");
      }

      if (car.available === available) {
        throw new Error("Carro já possui a mesma disponibilidade");
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
        
        if (available) {
          if (!user.reservations.includes(car.id)) {
            user.reservations.push(car.id);
            car.data_inicio = data_inicio;
            car.data_fim = data_fim;
          }
        } else {
          user.reservations = user.reservations.filter(
            (resId) => resId !== car.id
          )
          car.data_inicio = null;
          car.data_fim = null;
        }
        
        await user.save();

      }

      car.available = available;
      car.userId = available ? null :userId;
      await car.save();
      return { success: true, car };
    } catch (error) {
      console.error("Erro ao atualizar a disponibilidade:", error.message)
      return { success: false, message: error.message }
    }
  }
}