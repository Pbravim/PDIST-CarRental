import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class CarDetails extends Model {}
  CarDetails.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      class: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      city_mpg: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      combination_mpg: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cylinders: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      displacement: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      drive: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      fuel_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      highway_mpg: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      make: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      transmission: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "CarDetails",
      tableName: "car_details",
      timestamps: true,
    }
  );

  return CarDetails;
};
