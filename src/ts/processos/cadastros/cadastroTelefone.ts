import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";
import Telefone from "../../modelos/telefone";

export default class CadastroTelefone extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        console.log('Iniciando cadastro de Telefone...');

        let sub = true
        while (sub) {
            let ddd: string;
            do {
                ddd = this.entrada.receberTexto('Qual o DDD?');
                if (!ddd || isNaN(Number(ddd))) {
                    console.log('DDD deve ser um número válido. Por favor, insira um DDD válido.');
                }
            } while (!ddd || isNaN(Number(ddd)));

            let numero: string;
            do {
                numero = this.entrada.receberTexto('Qual o número?');
                if (!numero || isNaN(Number(numero))) {
                    console.log('Número deve ser um número válido. Por favor, insira um número válido.');
                }
            } while (!numero || isNaN(Number(numero)));

            let telefone = new Telefone(ddd, numero);
            this.cliente.Telefones.push(telefone);

            let continuar = this.entrada.receberTexto('Deseja adicionar outro telefone? (S/N)').toLowerCase();
            if (continuar === 'n') {
                sub = false;
                break;
            }
            console.log('Finalizando cadastro de Telefone...');
        }
    }

}