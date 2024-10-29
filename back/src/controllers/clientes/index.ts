import { Request, Response } from 'express';
import { Transaction } from 'sequelize';
import Cliente from '../../models/clientes';
import Telefone from '../../models/telefones';
import Endereco from '../../models/enderecos';
import Documento from '../../models/documentos';
import sequelize from '../../config/database';

class ClientesController {
  // Método para criar um cliente com telefones, endereços e documentos
  async create(req: Request, res: Response) {
    const transaction: Transaction = await sequelize.transaction();
    try {
      const { nome, nome_social, data_nascimento, titular_id, telefones, enderecos, documentos } = req.body;

      // Cria o cliente
      const cliente = await Cliente.create({ nome, nome_social, data_nascimento, titular_id }, { transaction });

      // Cria os telefones
      if (telefones && telefones.length > 0) {
        for (const telefone of telefones) {
          await Telefone.create({ ...telefone, cliente_id: cliente.id }, { transaction });
        }
      }

      // Cria os endereços
      if (enderecos && enderecos.length > 0) {
        for (const endereco of enderecos) {
          await Endereco.create({ ...endereco, cliente_id: cliente.id }, { transaction });
        }
      }

      // Cria os documentos
      if (documentos && documentos.length > 0) {
        for (const documento of documentos) {
          await Documento.create({ ...documento, cliente_id: cliente.id }, { transaction });
        }
      }

      await transaction.commit();
      res.status(201).json(cliente);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: 'Erro ao criar cliente: ' + error });
    }
  }

  async verificaDocumento(req: Request, res: Response) {
    try {
      const { numero_documento } = req.body;
      const documento = await Documento.findOne({ where: { numero_documento } });
      if (documento) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao verificar documento: ' + error });
    }
  }

  // Método para verificar se um telefone já existe
  async verificaTelefone(req: Request, res: Response) {
    try {
      const { DDD, numero } = req.body;
      const telefone = await Telefone.findOne({ where: { DDD, numero } });
      if (telefone) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao verificar telefone: ' + error });
    }
  }

  // Método para verificar se um titular existe
  async verificaTitular(req: Request, res: Response) {
    try {
      const { titular_id } = req.body;
      const titular = await Cliente.findOne({ where: { id: titular_id, titular_id: null } });
      if (titular) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao verificar titular: ' + error });
    }
  }

  // Método para obter todos os clientes
  async getAll(req: Request, res: Response) {
    try {
      const clientes = await Cliente.findAll({
        include: [
          { model: Telefone, as: 'telefones' },
          { model: Endereco, as: 'enderecos' },
          { model: Documento, as: 'documentos' },
        ],
      });
      res.status(200).json(clientes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter clientes: ' + error });
    }
  }

  // Método para obter um cliente por ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id, {
        include: [
          { model: Telefone, as: 'telefones' },
          { model: Endereco, as: 'enderecos' },
          { model: Documento, as: 'documentos' },
        ],
      });
      if (cliente) {
        res.status(200).json(cliente);
      } else {
        res.status(404).json({ error: 'Cliente não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter cliente: ' + error });
    }
  }


  // Método para atualizar um cliente
  async update(req: Request, res: Response) {
    const transaction: Transaction = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { nome, nome_social, data_nascimento, titular_id, telefones, enderecos, documentos } = req.body;

      const cliente = await Cliente.findByPk(id, { transaction });
      if (cliente) {
        cliente.nome = nome;
        cliente.nome_social = nome_social;
        cliente.data_nascimento = data_nascimento;
        cliente.titular_id = titular_id;
        await cliente.save({ transaction });

        // Atualiza os telefones
        if (telefones && telefones.length > 0) {
          await Telefone.destroy({ where: { cliente_id: id }, transaction });
          for (const telefone of telefones) {
            await Telefone.create({ ...telefone, cliente_id: id }, { transaction });
          }
        }

        // Atualiza os endereços
        if (enderecos && enderecos.length > 0) {
          await Endereco.destroy({ where: { cliente_id: id }, transaction });
          for (const endereco of enderecos) {
            await Endereco.create({ ...endereco, cliente_id: id }, { transaction });
          }
        }

        // Atualiza os documentos
        if (documentos && documentos.length > 0) {
          await Documento.destroy({ where: { cliente_id: id }, transaction });
          for (const documento of documentos) {
            await Documento.create({ ...documento, cliente_id: id }, { transaction });
          }
        }

        await transaction.commit();
        res.status(200).json(cliente);
      } else {
        await transaction.rollback();
        res.status(404).json({ error: 'Cliente não encontrado' });
      }
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: 'Erro ao atualizar cliente: ' + error });
    }
  }

  // Método para deletar um cliente
  async delete(req: Request, res: Response) {
    const transaction: Transaction = await sequelize.transaction();
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id, { transaction });
      if (cliente) {
        await cliente.destroy({ transaction });
        await transaction.commit();
        res.status(200).json({ message: 'Cliente deletado com sucesso' });
      } else {
        await transaction.rollback();
        res.status(404).json({ error: 'Cliente não encontrado' });
      }
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: 'Erro ao deletar cliente: ' + error });
    }
  }
}

export default new ClientesController();