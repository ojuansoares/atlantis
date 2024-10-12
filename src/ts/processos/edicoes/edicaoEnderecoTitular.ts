import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";
import Endereco from "../../modelos/endereco";

export default class EdicaoEnderecoTitular extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        console.log('Coletando os dados de endereço...');

        let rua = this.entrada.receberTexto('Qual a nova rua?') || this.cliente.Endereco.Rua;
        let bairro = this.entrada.receberTexto('Qual o novo bairro?') || this.cliente.Endereco.Bairro;
        let cidade = this.entrada.receberTexto('Qual a nova cidade?') || this.cliente.Endereco.Cidade;
        let estado = this.entrada.receberTexto('Qual o novo estado?') || this.cliente.Endereco.Estado;
        let pais = this.entrada.receberTexto('Qual o novo país?') || this.cliente.Endereco.Pais;
        let codigoPostalInput: string;
        let codigoPostal: string;
        do {
            codigoPostalInput = this.entrada.receberTexto('Qual o novo código postal?');
            if (isNaN(Number(codigoPostalInput))) {
            console.log('Código postal inválido. Por favor, insira um número.');
            }
        } while (isNaN(Number(codigoPostalInput)));
        codigoPostal = codigoPostalInput || this.cliente.Endereco.CodigoPostal;

        let enderecoAtualizado = new Endereco(rua, bairro, cidade, estado, pais, codigoPostal);
        this.cliente.Endereco = enderecoAtualizado;
    }
}