import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ImpressorEdicaoCliente implements Impressor {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        this.cliente = cliente

    }
    imprimir(): string {
        let impressao = `| Nome: ${this.cliente.Nome}` + `| Nome social: ${this.cliente.NomeSocial}\n`

        impressao = impressao + `\n****************************`
        return impressao
    }

}