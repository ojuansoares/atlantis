import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";
import Endereco from "../../modelos/endereco";

export default class CadastroEnderecoTitular extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        console.log('Coletando os dados de endereço...');

        let rua: string;
        do {
            rua = this.entrada.receberTexto('Qual a rua?');
            if (!rua) {
                console.log('Rua não pode ser vazia. Por favor, insira uma rua válida.');
            }
        } while (!rua);

        let bairro: string;
        do {
            bairro = this.entrada.receberTexto('Qual o bairro?');
            if (!bairro) {
                console.log('Bairro não pode ser vazio. Por favor, insira um bairro válido.');
            }
        } while (!bairro);

        let cidade: string;
        do {
            cidade = this.entrada.receberTexto('Qual a cidade?');
            if (!cidade) {
                console.log('Cidade não pode ser vazia. Por favor, insira uma cidade válida.');
            }
        } while (!cidade);

        let estado: string;
        do {
            estado = this.entrada.receberTexto('Qual o estado?');
            if (!estado) {
                console.log('Estado não pode ser vazio. Por favor, insira um estado válido.');
            }
        } while (!estado);

        let pais: string;
        do {
            pais = this.entrada.receberTexto('Qual o país?');
            if (!pais) {
                console.log('País não pode ser vazio. Por favor, insira um país válido.');
            }
        } while (!pais);

        let codigoPostal: string;
        do {
            codigoPostal = this.entrada.receberTexto('Qual o código postal?');
            if (!codigoPostal || isNaN(Number(codigoPostal))) {
            console.log('Código postal deve ser um número válido. Por favor, insira um código postal válido.');
            }
        } while (!codigoPostal || isNaN(Number(codigoPostal)));

        let endereco = new Endereco(rua, bairro, cidade, estado, pais, codigoPostal);
        this.cliente.Endereco = endereco;
    }
}