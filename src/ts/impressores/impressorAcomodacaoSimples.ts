import Impressor from "../interfaces/impressor";
import Acomodacao from "../modelos/acomodacao";

export default class ImpressorAcomodacaoSimples implements Impressor {
    private acomodacao: Acomodacao
    constructor(acomodacao: Acomodacao) {
        this.acomodacao = acomodacao
    }
    imprimir(): string {
        let descricao = `${this.acomodacao.NomeAcomodacao.toString()}`
        return descricao
    }
}