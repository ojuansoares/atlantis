import Processo from "../../abstracoes/processo";
import DiretorCasalSimples from "../../diretores/diretorCasalSimples";
import DiretorFamiliaSimples from "../../diretores/diretorFamiliaSimples";
import DiretorFamiliaMais from "../../diretores/diretorFamiliaMais";
import DiretorFamiliaSuper from "../../diretores/diretorFamiliaSuper";
import DiretorSolteiroSimples from "../../diretores/diretorSolteiroSimples";
import DiretorSolteiroMais from "../../diretores/diretorSolteiroMais";
import Armazem from "../../dominio/armazem";
import Acomodacao from "../../modelos/acomodacao";

export default class CadastroAcomodacoes extends Processo {
    private acomodacoes: Acomodacao[]
    constructor() {
        super()
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
    }
    processar(): void {

        let diretorCS = new DiretorCasalSimples()
        this.acomodacoes.push(diretorCS.construir())

        let diretorFS = new DiretorFamiliaSimples()
        this.acomodacoes.push(diretorFS.construir())

        let diretorFM = new DiretorFamiliaMais()
        this.acomodacoes.push(diretorFM.construir())

        let diretorFSup = new DiretorFamiliaSuper()
        this.acomodacoes.push(diretorFSup.construir())

        let diretorSS = new DiretorSolteiroSimples()
        this.acomodacoes.push(diretorSS.construir())

        let diretorSM = new DiretorSolteiroMais()
        this.acomodacoes.push(diretorSM.construir())
        
    }
}