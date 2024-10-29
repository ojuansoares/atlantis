import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Cliente extends Model {
  public id!: number;
  public nome!: string;
  public nome_social!: string;
  public data_nascimento!: Date;
  public titular_id?: number; // FK para indicar quem é o titular
}

Cliente.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  nome_social: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  titular_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Cliente,
      key: 'id',
    },
  },
}, {
  sequelize,
  tableName: 'clientes',
  timestamps: false,
});

export default Cliente;
