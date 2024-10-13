import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressorAcomodacaoSimples from "../../impressores/impressorAcomodacaoSimples";
import Impressor from "../../interfaces/impressor";
import Acomodacao from "../../modelos/acomodacao";

export default class ListagemAcomodacoesSimples extends Processo {
    private acomodacoes: Acomodacao[]
    private impressor!: Impressor
    constructor() {
        super()
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
    }
    processar(): void {
        console.clear()
        console.log('Acomodações Ofertadas:')
        console.log(`-------------------------------------------------`)
        this.acomodacoes.forEach((acomodacao, index) => {
            this.impressor = new ImpressorAcomodacaoSimples(acomodacao)
            console.log(`${index} - ${this.impressor.imprimir()}`)
        })
        console.log(`-------------------------------------------------`)
    }
}