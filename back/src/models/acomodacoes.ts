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

  public static async criarAcomodacoesPadrao() {
    const acomodacoesPadrao = [
      {
        nome: "Acomodação simples para casal",
        descricao: "Acomodação simples para casal",
        limite_acomodados: 2,
        leitosSolteiros: 0,
        leitosCasais: 1,
        climatizacao: true,
        garagens: 1,
        suites: 1
      },
      {
        nome: "Acomodação para família com até duas crianças",
        descricao: "Acomodação para família com até duas crianças",
        limite_acomodados: 4,
        leitosSolteiros: 2,
        leitosCasais: 1,
        climatizacao: true,
        garagens: 1,
        suites: 1
      },
      {
        nome: "Acomodação para família com até cinco crianças",
        descricao: "Acomodação para família com até cinco crianças",
        limite_acomodados: 7,
        leitosSolteiros: 5,
        leitosCasais: 1,
        climatizacao: true,
        garagens: 2,
        suites: 2
      },
      {
        nome: "Acomodação para até duas famílias, casal e três crianças cada",
        descricao: "Acomodação para até duas famílias, casal e três crianças cada",
        limite_acomodados: 10,
        leitosSolteiros: 6,
        leitosCasais: 2,
        climatizacao: true,
        garagens: 2,
        suites: 3
      },
      {
        nome: "Acomodação simples para solteiro(a)",
        descricao: "Acomodação simples para solteiro(a)",
        limite_acomodados: 1,
        leitosSolteiros: 1,
        leitosCasais: 0,
        climatizacao: true,
        garagens: 0,
        suites: 1
      },
      {
        nome: "Acomodação com garagem para solteiro(a)",
        descricao: "Acomodação com garagem para solteiro(a)",
        limite_acomodados: 1,
        leitosSolteiros: 0,
        leitosCasais: 1,
        climatizacao: true,
        garagens: 1,
        suites: 1
      }
    ];

    for (const acomodacao of acomodacoesPadrao) {
      const [, created] = await Acomodacao.findOrCreate({
        where: { nome: acomodacao.nome },
        defaults: acomodacao
      });
      if (created) {
        console.log(`Acomodação "${acomodacao.nome}" criada com sucesso.`);
      }
    }
  }
}

Acomodacao.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(150),
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
