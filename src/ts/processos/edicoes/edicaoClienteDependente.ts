import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import ListagemEdicaoDependente from "../listagens/listagemEdicaoDependente";
import ListagemEdicaoDocumento from "../listagens/listagemEdicaoDocumento";
import EdicaoEnderecoTitular from "./edicaoEnderecoTitular";
import ListagemTelefones from "../listagens/listagemTelefones";
import ListagemEdicaoTitular from "../listagens/listagemEdicaoTitular";

export default class EdicaoClienteDependente extends Processo {
    processar(): void {
        console.clear()

        if (!Armazem.InstanciaUnica.Clientes.some(c => c.Titular !== '')) {
            console.log(`\nNão há Clientes Dependentes para Editar! \nCrie um Cliente Dependente Primeiro.\n`)
            return;
        }

        this.processo = new ListagemEdicaoDependente()
        this.processo.processar()

        let sub = true
        let clienteCPF: string = '';
        let clienteEditar: Cliente = new Cliente('', '', new Date());
        while (sub) {
            clienteCPF = this.entrada.receberTexto('CPF do Cliente Dependente Que Deseja Editar: ')
        
            const clienteEncontrado = Armazem.InstanciaUnica.Clientes.find(cliente => 
                cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoa Física' && doc.Numero === clienteCPF) && 
                cliente.Titular !== '' 
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

        this.processo = new ListagemTelefones(clienteEditar)
        this.processo.processar()

        let sub5 = true
        while (sub5) {
            let telefoneIndexTexto = this.entrada.receberTexto('Qual Telefone Deseja Editar?');
            if (!telefoneIndexTexto) {
                sub5 = false;
                break;
            }

            let telefoneIndex = parseInt(telefoneIndexTexto, 10);
            if (!isNaN(telefoneIndex) && telefoneIndex >= 0 && telefoneIndex < clienteEditar.Telefones.length) {

                let novoDdd: string;
                do {
                    novoDdd = this.entrada.receberTexto('Qual o novo DDD?:');
                    if (!novoDdd) {
                        console.log('DDD não pode ser vazio. Por favor, insira um DDD válido.');
                    }
                } while (!novoDdd);

                if (novoDdd) {
                    clienteEditar.Telefones[telefoneIndex].Ddd = novoDdd;
                }

                let novoNumero: string;
                do {
                    novoNumero = this.entrada.receberTexto('Qual o novo Número?:');
                    if (!novoNumero) {
                        console.log('Número não pode ser vazio. Por favor, insira um Número válido.');
                    }
                } while (!novoNumero);

                if (novoNumero) {
                    clienteEditar.Telefones[telefoneIndex].Numero = novoNumero
                }

                sub5 = false;
                break;
            } else {
                console.log('Telefone não encontrado. Tente novamente.');
            }
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

        let sub3 = true
        while (sub3) {

            let decisao = this.entrada.receberTexto("Deseja Alterar o Titular? (S/N)").toLowerCase()
            if (decisao !== 's') {
                sub3 = false
                break;
            }

            this.processo = new ListagemEdicaoTitular();
            this.processo.processar()

            let sub4 = true
            let titularCPF: string = '';
            while (sub4) {
                titularCPF = this.entrada.receberTexto('CPF do Titular: ')
            
                const clienteEncontrado = Armazem.InstanciaUnica.Clientes.find(cliente => 
                    cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoa Física' && doc.Numero === titularCPF) && cliente.Titular == ''
                );

                if (clienteEncontrado && titularCPF === clienteEditar.Titular) {
                    console.log("Você Já É Dependente Deste Titular!")
                    continue;
                } else if (clienteEncontrado) {
                    sub4 = false;
                    break;
                } else {
                    console.log('Cliente não encontrado');
                    return;
                }
            }

            // guardando cpf do titular atual
            let cpfTitularAtual = clienteEditar.Titular

            // guardando o index do titular dentro dos clientes do sistema
            let indexTitularAtual = Armazem.InstanciaUnica.Clientes.findIndex(c => c.Documentos.some(d => d.Tipo === 'Cadastro de Pessoa Física' && d.Numero == cpfTitularAtual))

            // guardando o index do dependente atual dentro da lista de dependentes do titular
            let indexDependenteAtual = Armazem.InstanciaUnica.Clientes[indexTitularAtual].Dependentes.findIndex(a => a == clienteCPF)

            // deletando o dependente do titular atual
            Armazem.InstanciaUnica.Clientes[indexTitularAtual].Dependentes.splice(indexDependenteAtual, 1)
            console.log("Deletando Dependente do Titular Atual...")

            // atualizando o cpf do novo titular no do dependente atual
            clienteEditar.Titular = titularCPF
            console.log("Atualizando Titular no Dependente Atual...")

            // guardando o index do titular novo dentro dos clientes do sistema
            let indexTitularNovo = Armazem.InstanciaUnica.Clientes.findIndex(c => c.Documentos.some(d => d.Tipo === 'Cadastro de Pessoa Física' && d.Numero == titularCPF))

            // adicionando dependente atual na lista de dependentes do novo titular
            Armazem.InstanciaUnica.Clientes[indexTitularNovo].Dependentes.push(clienteCPF)
            console.log("Vinculando Dependente Ao Novo Titular...")
        }

        // Substituir o cliente existente pelo cliente atualizado no Armazem
        const clienteIndex = Armazem.InstanciaUnica.Clientes.findIndex(cliente => 
            cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoa Física' && doc.Numero === clienteCPF)
        );

        if (clienteIndex !== -1) {
            Armazem.InstanciaUnica.Clientes[clienteIndex] = clienteEditar;
        }

        console.log('Finalizando a edição do cliente...')
    }
}