import CarDetailsRepository from "../repositories/carDetailsRepository.js";


export default class CarDetailsService {
  constructor() {
    this.carDetailsRepository = new CarDetailsRepository();
  }

  async findAll(options) {
    return await this.carDetailsRepository.findAll(options);
  }

  async findById(id, options = {}) {
    options.where = { ...(options.where || {}), id };

    return await this.carDetailsRepository.findOne(options);
  }

  async updateAvailability(id, available) {
    try {
        
      console.log(`Atualizando disponibilidade do carro com ID: ${id}`);
      console.log();

      const car = await this.carDetailsRepository.findOne({ where: { id } });

      if (!car) {
        console.error("Carro não encontrado!");
        throw new Error("Carro não encontrado");
      }

      console.log(`Carro encontrado: ${JSON.stringify(car)}`);

      car.available = available;
      await car.save(); // Salva a atualização no banco de dados
      console.log(`Disponibilidade após atualização: ${car.available}`);

      console.log();
      console.log(car)

      return car;
    } catch (error) {
      console.error("Erro ao atualizar a disponibilidade:", error.message);
      throw new Error("Erro ao atualizar a disponibilidade");
    }
  }
}
