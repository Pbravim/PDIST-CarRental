import { Op } from "sequelize";
import CarDetailsService from "../services/carDetailsService.js";



export default class CarDetailsController {
    constructor() {
        this.carDetailsService = new CarDetailsService();   
        
    }

    async findAll(req, res) {
        try {
            const { make, model, year, fuel_type } = req.query;
            
            const options = { where: {} };
    
            if (make) options.where.make = {[Op.iLike]: `${make}%`};
            if (model) options.where.model = {[Op.iLike]: `${model}%`};
            if (year) options.where.year = Number(year);
            if (fuel_type) options.where.fuel_type = fuel_type;
            
            console.log(options)

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
            
            const options = {}

            const carDetails = await this.carDetailsService.findById(id, options);

            if (!carDetails) {
                return res.status(404).json({ message: "Carro não encontrado" });
            }
    
            res.status(200).json(carDetails);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar os detalhes do carro" });
        }
    }


}