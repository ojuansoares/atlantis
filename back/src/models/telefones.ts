import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Cliente from './clientes';

class Telefone extends Model {
  public id!: number;
  public DDD!: string;
  public numero!: string;
  public cliente_id!: number;
}

Telefone.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Cliente,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  DDD: {
    type: DataTypes.STRING(3),
    allowNull: false,
  },
  numero: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'telefones',
  timestamps: false,
});

export default Telefone;
