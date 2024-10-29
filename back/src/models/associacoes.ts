import Cliente from './clientes';
import Telefone from './telefones';
import Endereco from './enderecos';
import Documento from './documentos';
import Acomodacao from './acomodacoes';
import AcomodacaoCliente from './acomodacao_cliente';

export const setupAssociations = () => {
  Cliente.hasMany(Telefone, { foreignKey: 'cliente_id', as: 'telefones' });
  Cliente.hasMany(Endereco, { foreignKey: 'cliente_id', as: 'enderecos' });
  Cliente.hasMany(Documento, { foreignKey: 'cliente_id', as: 'documentos' });

  Telefone.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
  Endereco.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
  Documento.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });

  // Outras associações entre acomodação e cliente
  Acomodacao.hasMany(AcomodacaoCliente, { foreignKey: 'acomodacao_id' });
  Cliente.hasMany(AcomodacaoCliente, { foreignKey: 'cliente_id' });
  AcomodacaoCliente.belongsTo(Cliente, { foreignKey: 'cliente_id' });
  AcomodacaoCliente.belongsTo(Acomodacao, { foreignKey: 'acomodacao_id' });
};
