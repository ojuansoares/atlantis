import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import ListagemEdicaoTitular from "../listagens/listagemEdicaoTitular";
import ListagemEdicaoDocumento from "../listagens/listagemEdicaoDocumento";
import EdicaoEnderecoTitular from "./edicaoEnderecoTitular";

export default class EdicaoClienteTitular extends Processo {
    processar(): void {
        console.clear()

        const quantidadeClientes = Armazem.InstanciaUnica.Clientes.length
        if (quantidadeClientes === 0) {
            console.log('Não há clientes para editar.');
            return;
        }

        this.processo = new ListagemEdicaoTitular()
        this.processo.processar()

        let sub = true
        let clienteCPF: string = '';
        let clienteEditar: Cliente = new Cliente('', '', new Date());
        while (sub) {
            clienteCPF = this.entrada.receberTexto('CPF do Cliente Titular Que Deseja Editar: ')
        
            const clienteEncontrado = Armazem.InstanciaUnica.Clientes.find(cliente => 
                cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoas Física' && doc.Numero === clienteCPF) && 
                cliente.Titular === undefined
            );

            if (clienteEncontrado) {
                clienteEditar = clienteEncontrado;
                sub = false;
                break;
            } else {
                console.log('Cliente não encontrado');
                return;
            }
        }

        // Receber as novas informações do cliente e atualizar diretamente
        let nome = this.entrada.receberTexto('Qual o novo nome do cliente?');
        if (nome) {
            clienteEditar.Nome = nome;
        }

        let nomeSocial = this.entrada.receberTexto('Qual o novo nome social do cliente?');
        if (nomeSocial) {
            clienteEditar.NomeSocial = nomeSocial;
        }

        let dataNascimento = this.entrada.receberData('Qual a nova data de nascimento do cliente?');
        if (dataNascimento) {
            clienteEditar.DataNascimento = dataNascimento;
        }

        this.processo = new EdicaoEnderecoTitular(clienteEditar);
        this.processo.processar();

        this.processo = new ListagemEdicaoDocumento(clienteEditar);
        this.processo.processar();

        let sub2 = true;
        while (sub2) {
            let documentoIndexTexto = this.entrada.receberTexto('Qual Documento Deseja Editar?');
            if (!documentoIndexTexto) {
                sub2 = false;
                break;
            }

            let documentoIndex = parseInt(documentoIndexTexto, 10);
            if (!isNaN(documentoIndex) && documentoIndex >= 0 && documentoIndex < clienteEditar.Documentos.length) {
                let novoNumero = this.entrada.receberTexto('Qual o novo número do documento?');
                if (novoNumero) {
                    clienteEditar.Documentos[documentoIndex].Numero = novoNumero;
                }
                let novaDataExpedicao = this.entrada.receberData('Qual a nova data de expedição do documento?');
                if (novaDataExpedicao) {
                    clienteEditar.Documentos[documentoIndex].DataExpedicao = novaDataExpedicao;
                }

                sub2 = false;
            } else {
                console.log('Documento não encontrado. Tente novamente.');
            }
        }

        // Substituir o cliente existente pelo cliente atualizado no Armazem
        const clienteIndex = Armazem.InstanciaUnica.Clientes.findIndex(cliente => 
            cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoas Física' && doc.Numero === clienteCPF)
        );

        if (clienteIndex !== -1) {
            Armazem.InstanciaUnica.Clientes[clienteIndex] = clienteEditar;
        }

        console.log('Finalizando a edição do cliente...')
    }
}