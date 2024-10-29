import express from 'express';
import cors from 'cors';
import clientesRoutes from './routes/clientes';
import acomodacoesRoutes from './routes/acomodacoes';
import acomodacaoClienteRoutes from './routes/acomodacao_cliente';
import sequelize from './config/database';
import './models/clientes';  // Certifique-se de importar os modelos
import './models/telefones';
import './models/enderecos';
import './models/documentos';
import './models/acomodacoes';
import './models/acomodacao_cliente';
import { setupAssociations } from './models/associacoes';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000' // Permitir apenas o frontend
}));

app.use(express.json()); // Substitui body-parser

setupAssociations();

// ROTAS IMPORTADAS
app.use('/clientes', clientesRoutes);
app.use('/acomodacoes', acomodacoesRoutes);
app.use('/acomodacao_cliente', acomodacaoClienteRoutes);

// Sincronizar o banco de dados e iniciar o servidor
const init = async () => {
  try {
    // Sincroniza os modelos com o banco de dados
    await sequelize.sync({ force: false });
    console.log('Tabelas sincronizadas com sucesso.');

    const PORT = process.env.DB_PORT;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
  }
};

init();
