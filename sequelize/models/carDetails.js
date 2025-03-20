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
        allowNull: true,
      },
      displacement: {
        type: DataTypes.FLOAT,
        allowNull: true,
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
      userId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      preco_diario: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      data_inicio: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      data_fim: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "CarDetails",
      tableName: "car_details",
      timestamps: true,
    }
  );

  CarDetails.associate = (models) => {
    CarDetails.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return CarDetails;
};
