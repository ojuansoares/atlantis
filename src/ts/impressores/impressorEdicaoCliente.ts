import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ImpressorEdicaoCliente implements Impressor {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        this.cliente = cliente

    }
    imprimir(): string {
        let CPF = this.cliente.Documentos.find(d => d.Tipo == 'Cadastro de Pessoas Física')
        let impressao = `| Nome: ${this.cliente.Nome} ` + `| CPF: ${CPF?.Numero}`

        impressao = impressao + `\n****************************`
        return impressao
    }

}