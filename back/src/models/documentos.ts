import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Cliente from './clientes';

class Documento extends Model {
  public id!: number;
  public tipo_documento!: 'CPF' | 'RG' | 'Passaporte';
  public numero_documento!: string;
  public data_expedicao!: Date;
  public cliente_id!: number;
}

Documento.init({
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
  tipo_documento: {
    type: DataTypes.ENUM('CPF', 'RG', 'Passaporte'),
    allowNull: false,
  },
  numero_documento: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  data_expedicao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'documentos',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['cliente_id', 'tipo_documento'], // Garante que cada cliente tenha apenas um documento de cada tipo
    },
  ],
});

export default Documento;
