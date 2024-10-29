import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'atlantis',
  process.env.DB_USER || 'usuario',
  process.env.DB_PASSWORD || 'senha',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  }
);

// Testar a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados MySQL estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

export default sequelize;
