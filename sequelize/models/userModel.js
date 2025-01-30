import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class User extends Model {}

    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true, 
    });

    return User;
};
