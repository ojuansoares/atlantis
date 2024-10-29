import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Cliente from './clientes';
import Acomodacao from './acomodacoes';

class AcomodacaoCliente extends Model {
  public id!: number;
  public cliente_id!: number;
  public acomodacao_id!: number;
  public data_entrada!: Date;
}

AcomodacaoCliente.init({
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
  acomodacao_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Acomodacao,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  data_entrada: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'acomodacao_cliente',
  timestamps: false,
});

export default AcomodacaoCliente;
