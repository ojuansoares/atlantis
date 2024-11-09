import { NextFunction, Request, Response } from 'express';
import { Transaction, Op } from 'sequelize';
import AcomodacaoCliente from '../../models/acomodacao_cliente';
import Cliente from '../../models/clientes';
import Acomodacao from '../../models/acomodacoes';
import sequelize from '../../config/database';

class AcomodacaoClienteController {
  constructor() {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.delete = this.delete.bind(this);
  }

  // Método para criar uma acomodação de cliente
  async create(req: Request, res: Response) {
    const transaction: Transaction = await sequelize.transaction();
    try {
      const { cliente_id, acomodacao_id, data_entrada } = req.body;

      // Cria a acomodação do cliente
      const acomodacaoCliente = await AcomodacaoCliente.create({ cliente_id, acomodacao_id, data_entrada }, { transaction });

      await transaction.commit();
      res.status(201).json(acomodacaoCliente);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: 'Erro ao criar acomodação de cliente: ' + error });
    }
  }

  // Método para verificar se o cliente já está acomodado em outra acomodação
  async verificaClienteAcomodado(req: Request, res: Response) {
    try {
      const { cliente_id } = req.params;
      const clienteAcomodado = await AcomodacaoCliente.findOne({ where: { cliente_id } });
      res.status(200).json({ acomodado: !!clienteAcomodado });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao verificar se o cliente está acomodado: ' + error });
    }
  }

  // Método para verificar o limite de acomodados na acomodação
  async verificaLimiteAcomodacao(req: Request, res: Response, next: NextFunction) {
    try {
      const { acomodacao_id } = req.params;
      const acomodacao = await Acomodacao.findByPk(acomodacao_id);
      if (!acomodacao) {
        return res.status(404).json({ error: 'Acomodação não encontrada.' });
      }

      const acomodadosCount = await AcomodacaoCliente.count({ where: { acomodacao_id } });
      const limiteAtingido = acomodadosCount == acomodacao.limite_acomodados;
      res.status(200).json({ limiteAtingido });
    } catch (error) {
      next(error);
    }
  }

  // Método para obter todas as acomodações de clientes
  async getAll(req: Request, res: Response) {
    try {
      const acomodacoesClientes = await AcomodacaoCliente.findAll({
        include: [Cliente, Acomodacao],
      });
      res.status(200).json(acomodacoesClientes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter acomodações de clientes: ' + error });
    }
  }

  // Método para obter os clientes acomodados por acomodação
  async getClientesByAcomodacao(req: Request, res: Response) {
    try {
      const { acomodacao_id } = req.params;
      const acomodacoesClientes = await AcomodacaoCliente.findAll({
        where: { acomodacao_id },
        attributes: ['cliente_id'],
      });

      const clienteIds = acomodacoesClientes.map(ac => ac.cliente_id);
      res.status(200).json(clienteIds);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter clientes por acomodação: ' + error });
    }
  }

  // Método para obter uma acomodação de cliente por ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const acomodacaoCliente = await AcomodacaoCliente.findByPk(id, {
        include: [Cliente, Acomodacao],
      });
      if (acomodacaoCliente) {
        res.status(200).json(acomodacaoCliente);
      } else {
        res.status(404).json({ error: 'Acomodação de cliente não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter acomodação de cliente: ' + error });
    }
  }

  // Método para desvincular um cliente de uma acomodação
  async delete(req: Request, res: Response) {
    const transaction: Transaction = await sequelize.transaction();
    try {
      const { acomodacao_id, cliente_id } = req.params;

      // Verifica se o cliente está acomodado na acomodação
      const acomodacaoCliente = await AcomodacaoCliente.findOne({ where: { acomodacao_id, cliente_id }, transaction });

      if (acomodacaoCliente) {
        await acomodacaoCliente.destroy({ transaction });
        await transaction.commit();
        res.status(200).json({ message: 'Cliente desvinculado da acomodação com sucesso' });
      } else {
        await transaction.rollback();
        res.status(404).json({ error: 'Acomodação de cliente não encontrada' });
      }
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: 'Erro ao desvincular cliente da acomodação: ' + error });
    }
  }
}

export default new AcomodacaoClienteController(); 