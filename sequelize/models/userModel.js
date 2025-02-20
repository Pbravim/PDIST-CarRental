import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class User extends Model {}

    User.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        rua: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true, 
    });

    User.hasMany(sequelize.models.CarDetails, {
      foreignKey: "userId",
      as: "reservations",
    });

    return User;
};
