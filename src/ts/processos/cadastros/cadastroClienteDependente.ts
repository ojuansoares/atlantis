import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import CadastrarDocumentosCliente from "../documentos/cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";
import CadastroTelefone from "./cadastroTelefone";
import ListagemEdicaoTitular from "../listagens/listagemEdicaoTitular";

export default class CadastroClienteDependente extends Processo {
    processar(): void {
        console.clear()

        if (!Armazem.InstanciaUnica.Clientes.some(c => c.Titular == '')) {
            console.log(`\nNão há Clientes Titulares para vincular a um Dependente! \nCrie um Cliente Titular Primeiro.\n`)
            return;
        }

        console.log('Iniciando o cadastro de um novo dependente...')

        let nome: string;
        do {
            nome = this.entrada.receberTexto('Qual o nome do novo dependente?');
            if (!nome) {
                console.log('Nome não pode ser vazio. Por favor, insira um nome válido.');
            }
        } while (!nome);

        let nomeSocial: string;
        do {
            nomeSocial = this.entrada.receberTexto('Qual o nome social do novo dependente?');
            if (!nomeSocial) {
                console.log('Nome social não pode ser vazio. Por favor, insira um nome social válido.');
                }
        } while (!nomeSocial);

        let dataNascimento: Date;
        do {
            dataNascimento = this.entrada.receberData('Qual a data de nascimento?');
            if (!dataNascimento || isNaN(dataNascimento.getTime())) {
                console.log('Data de nascimento inválida. Por favor, insira uma data válida.');
            }
        } while (!dataNascimento || isNaN(dataNascimento.getTime()));

        let cliente = new Cliente(nome, nomeSocial, dataNascimento);

        this.processo = new CadastroTelefone(cliente);
        this.processo.processar();

        this.processo = new CadastroEnderecoTitular(cliente);
        this.processo.processar();

        this.processo = new CadastrarDocumentosCliente(cliente);
        this.processo.processar();

        // pegando cpf do dependente
        const dependenteCPF = cliente.Documentos.find(doc => doc.Tipo === 'Cadastro de Pessoas Física')?.Numero;
        if (!dependenteCPF) {
            console.log('Erro ao guardar o CPF do dependente.');
            return;
        }

        this.processo = new ListagemEdicaoTitular()
        this.processo.processar()

        // verificação do cpf do titular
        let sub = true
        let titularCPF: string = '';
        while (sub) {
            titularCPF = this.entrada.receberTexto('Digite o CPF do Titular:')
        
            const titularEncontrado = Armazem.InstanciaUnica.Clientes.find(cliente => 
                cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoas Física' && doc.Numero === titularCPF) && cliente.Titular == ''
            );

            if (titularEncontrado) {
                sub = false;
                break;
            } else {
                console.log('Titular Não Encontrado');
                continue;
            }
        }

        // adicionando cpf do titular a Titular do Dependente
        cliente.Titular = titularCPF
        console.log(`Titular ${titularCPF} Vinculado!`)

        // pegando index do titular
        let titularIndex = Armazem.InstanciaUnica.Clientes.findIndex(c => c.Documentos.some(d => d.Tipo === 'Cadastro de Pessoas Física' && d.Numero === titularCPF))

        // adicionando cpf do dependente a lista de dependentes do titular
        if (!Armazem.InstanciaUnica.Clientes[titularIndex].Dependentes) {
            Armazem.InstanciaUnica.Clientes[titularIndex].Dependentes = [];
        }
        Armazem.InstanciaUnica.Clientes[titularIndex].Dependentes.push(dependenteCPF);

        // criando dependente
        let armazem = Armazem.InstanciaUnica;
        armazem.Clientes.push(cliente);

        console.log('Finalizando o Cadastro do Dependente...');
    }
}