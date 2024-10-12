import Impressor from "../interfaces/impressor";
import Documento from "../modelos/documento";

export default class ImpressorEdicaoDocumento implements Impressor {
    private documento: Documento

    constructor(documento: Documento) {
        this.documento = documento
    }

    imprimir(): string {
        let impressao =
              `| Tipo: ${this.documento.Tipo} `
            + `| Data expedição: ${this.documento.DataExpedicao.toLocaleDateString()} `
            + `| Número: ${this.documento.Numero}`
        return impressao
    }

}