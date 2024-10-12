import Processo from "../../abstracoes/processo";
import ImpressorEdicaoDocumento from "../../impressores/impressorEdicaoDocumento";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";

export default class ListagemEdicaoDocumento extends Processo {
    private cliente: Cliente;
    private impressor!: Impressor;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        console.clear();
        console.log('Documentos:');
        this.cliente.Documentos.forEach((documento, documentoIndex) => {
            this.impressor = new ImpressorEdicaoDocumento(documento);
            console.log(`${documentoIndex}: ${this.impressor.imprimir()}`);
        });
    }
}
