import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Acomodacao extends Model {
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public limite_acomodados!: number;
  public leitosSolteiros!: number;
  public leitosCasais!: number;
  public climatizacao!: boolean;
  public garagens!: number;
  public suites!: number;
}

Acomodacao.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  limite_acomodados: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  leitosSolteiros: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  leitosCasais: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  climatizacao: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  garagens: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  suites: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'acomodacoes',
  timestamps: false,
});

export default Acomodacao;
