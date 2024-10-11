import Processo from "../../abstracoes/processo";
import ImpressorTelefone from "../../impressores/impressorTelefone";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";

export default class ListagemTelefones extends Processo {
    private cliente: Cliente;
    private impressor!: Impressor;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        console.clear();
        console.log('Telefones:');
        this.cliente.Telefones.forEach((telefone, telefoneIndex) => {
            this.impressor = new ImpressorTelefone(telefone);
            console.log(`${telefoneIndex}: ${this.impressor.imprimir()}`);
        });
    }
}
