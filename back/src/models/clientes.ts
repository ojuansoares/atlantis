import { DataTypes, Model, Transaction } from 'sequelize';
import sequelize from '../config/database';
import Telefone from './telefones';
import Endereco from './enderecos';
import Documento from './documentos';

class Cliente extends Model {
  public id!: number;
  public nome!: string;
  public nome_social!: string;
  public data_nascimento!: Date;
  public titular_id?: number; // FK para indicar quem é o titular

  public static async criarClientesPadrao() {
    const clientesPadrao = [
      {
        nome: "João Silva",
        nome_social: "João S.",
        data_nascimento: "1990-01-01",
        titular_id: null,
        telefones: [
          { DDD: "11", numero: "987654321" },
          { DDD: "21", numero: "912345678" }
        ],
        enderecos: [
          {
            rua: "Rua Exemplo",
            bairro: "Bairro Exemplo",
            cidade: "Cidade Exemplo",
            estado: "Estado Exemplo",
            pais: "Brasil",
            cep: "12345-678"
          }
        ],
        documentos: [
          { tipo_documento: "CPF", numero_documento: "123.456.789-00", data_expedicao: "2010-01-01" },
          { tipo_documento: "RG", numero_documento: "12.345.678-6", data_expedicao: "2005-01-01" }
        ]
      },
      {
        nome: "Maria Oliveira",
        nome_social: "Maria O.",
        data_nascimento: "1985-05-15",
        titular_id: null,
        telefones: [
          { DDD: "31", numero: "987654321" }
        ],
        enderecos: [
          {
            rua: "Rua Exemplo 2",
            bairro: "Bairro Exemplo 2",
            cidade: "Cidade Exemplo 2",
            estado: "Estado Exemplo 2",
            pais: "Brasil",
            cep: "23456-789"
          }
        ],
        documentos: [
          { tipo_documento: "CPF", numero_documento: "234.567.890-01", data_expedicao: "2011-02-02" },
          { tipo_documento: "RG", numero_documento: "23.456.789-2", data_expedicao: "2006-02-02" }
        ]
      },
      {
        nome: "Carlos Pereira",
        nome_social: "Carlos P.",
        data_nascimento: "1975-10-20",
        titular_id: null,
        telefones: [
          { DDD: "41", numero: "987654321" }
        ],
        enderecos: [
          {
            rua: "Rua Exemplo 3",
            bairro: "Bairro Exemplo 3",
            cidade: "Cidade Exemplo 3",
            estado: "Estado Exemplo 3",
            pais: "Brasil",
            cep: "34567-890"
          }
        ],
        documentos: [
          { tipo_documento: "CPF", numero_documento: "345.678.901-02", data_expedicao: "2012-03-03" },
          { tipo_documento: "RG", numero_documento: "34.567.890-1", data_expedicao: "2007-03-03" }
        ]
      },
      {
        nome: "Ana Silva",
        nome_social: "Ana S.",
        data_nascimento: "2010-01-01",
        titular_id: 1,
        telefones: [
          { DDD: "11", numero: "987654322" }
        ],
        enderecos: [
          {
            rua: "Rua Exemplo",
            bairro: "Bairro Exemplo",
            cidade: "Cidade Exemplo",
            estado: "Estado Exemplo",
            pais: "Brasil",
            cep: "12345-678"
          }
        ],
        documentos: [
          { tipo_documento: "CPF", numero_documento: "456.789.012-03", data_expedicao: "2020-01-01" }
        ]
      },
      {
        nome: "Pedro Oliveira",
        nome_social: "Pedro O.",
        data_nascimento: "2015-05-15",
        titular_id: 2,
        telefones: [
          { DDD: "31", numero: "987654323" }
        ],
        enderecos: [
          {
            rua: "Rua Exemplo 2",
            bairro: "Bairro Exemplo 2",
            cidade: "Cidade Exemplo 2",
            estado: "Estado Exemplo 2",
            pais: "Brasil",
            cep: "23456-789"
          }
        ],
        documentos: [
          { tipo_documento: "CPF", numero_documento: "567.890.123-04", data_expedicao: "2021-02-02" }
        ]
      },
      {
        nome: "Lucas Pereira",
        nome_social: "Lucas P.",
        data_nascimento: "2018-10-20",
        titular_id: 3,
        telefones: [
          { DDD: "41", numero: "987654324" }
        ],
        enderecos: [
          {
            rua: "Rua Exemplo 3",
            bairro: "Bairro Exemplo 3",
            cidade: "Cidade Exemplo 3",
            estado: "Estado Exemplo 3",
            pais: "Brasil",
            cep: "34567-890"
          }
        ],
        documentos: [
          { tipo_documento: "CPF", numero_documento: "678.901.234-05", data_expedicao: "2022-03-03" }
        ]
      }
    ];

    const transaction: Transaction = await sequelize.transaction();
    try {

      for (const cliente of clientesPadrao) {
        const [novoCliente, created] = await Cliente.findOrCreate({
        where: { nome: cliente.nome },
        defaults: {
          nome_social: cliente.nome_social,
          data_nascimento: cliente.data_nascimento,
          titular_id: cliente.titular_id
        },
        transaction
        });
    
        if (created) {
        // Criar telefones
        for (const telefone of cliente.telefones) {
          await Telefone.create({ ...telefone, cliente_id: novoCliente.id }, { transaction });
        }
    
        // Criar endereços
        for (const endereco of cliente.enderecos) {
          await Endereco.create({ ...endereco, cliente_id: novoCliente.id }, { transaction });
        }
    
        // Criar documentos
        for (const documento of cliente.documentos) {
          await Documento.create({ ...documento, cliente_id: novoCliente.id }, { transaction });
        }
    
        console.log(`Cliente "${cliente.nome}" criado com sucesso.`);
        }
      }

      await transaction.commit();
      console.log('Clientes padrão criados com sucesso.');
    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao criar clientes padrão:', error);
    }

  }
}

Cliente.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  nome_social: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  titular_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Cliente,
      key: 'id',
    },
    onDelete: 'CASCADE', // Adiciona a regra de exclusão em cascata
  },
}, {
  sequelize,
  tableName: 'clientes',
  timestamps: false,
});

export default Cliente;
