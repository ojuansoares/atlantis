import { Request, Response } from 'express';
import Acomodacao from '../../models/acomodacoes';

class AcomodacoesController {
  // Método para criar uma acomodação
  async create(req: Request, res: Response) {
    try {
      const { nome, descricao, limite_acomodados, leitosSolteiros, leitosCasais, climatizacao, garagens, suites } = req.body;
      const acomodacao = await Acomodacao.create({ nome, descricao, limite_acomodados, leitosSolteiros, leitosCasais, climatizacao, garagens, suites });
      res.status(201).json(acomodacao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar acomodação: ' + error });
    }
  }

  // Método para obter todas as acomodações
  async getAll(req: Request, res: Response) {
    try {
      const acomodacoes = await Acomodacao.findAll();
      res.status(200).json(acomodacoes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter acomodações: ' + error });
    }
  }

  // Método para obter uma acomodação por ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const acomodacao = await Acomodacao.findByPk(id);
      if (acomodacao) {
        res.status(200).json(acomodacao);
      } else {
        res.status(404).json({ error: 'Acomodação não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter acomodação: ' + error });
    }
  }

  
  // Método para atualizar uma acomodação
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, descricao, limite_acomodados, leitosSolteiros, leitosCasais, climatizacao, garagens, suites } = req.body;
      const acomodacao = await Acomodacao.findByPk(id);
      if (acomodacao) {
        acomodacao.nome = nome;
        acomodacao.descricao = descricao;
        acomodacao.limite_acomodados = limite_acomodados;
        acomodacao.leitosSolteiros = leitosSolteiros;
        acomodacao.leitosCasais = leitosCasais;
        acomodacao.climatizacao = climatizacao;
        acomodacao.garagens = garagens;
        acomodacao.suites = suites;
        await acomodacao.save();
        res.status(200).json(acomodacao);
      } else {
        res.status(404).json({ error: 'Acomodação não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar acomodação: ' + error });
    }
  }

  // Método para deletar uma acomodação
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const acomodacao = await Acomodacao.findByPk(id);
      if (acomodacao) {
        await acomodacao.destroy();
        res.status(200).json({ message: 'Acomodação deletada com sucesso' });
      } else {
        res.status(404).json({ error: 'Acomodação não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar acomodação: ' + error });
    }
  }
}

export default new AcomodacoesController();