import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import CadastrarDocumentosCliente from "../documentos/cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastroClienteTitular extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo cliente...')

        let nome: string;
        do {
            nome = this.entrada.receberTexto('Qual o nome do novo cliente?');
            if (!nome) {
                console.log('Nome não pode ser vazio. Por favor, insira um nome válido.');
            }
        } while (!nome);

        let nomeSocial: string;
        do {
            nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?');
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

        this.processo = new CadastroEnderecoTitular(cliente);
        this.processo.processar();

        this.processo = new CadastrarDocumentosCliente(cliente);
        this.processo.processar();

        let armazem = Armazem.InstanciaUnica;
        armazem.Clientes.push(cliente);

        console.log('Finalizando o cadastro do cliente...');
    }
}