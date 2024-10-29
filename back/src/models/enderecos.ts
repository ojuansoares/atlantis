import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Cliente from './clientes';

class Endereco extends Model {
  public id!: number;
  public rua!: string;
  public bairro!: string;
  public cidade!: string;
  public estado!: string;
  public pais!: string;
  public cep!: string;
  public cliente_id!: number;
}

Endereco.init({
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
  rua: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  pais: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'enderecos',
  timestamps: false,
});

export default Endereco;
