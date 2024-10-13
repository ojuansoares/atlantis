import ConstrutorAcomodacao from "../construtores/construtorAcomodacao";
import { NomeAcomodacao } from "../enumeracoes/NomeAcomodacao";
import Acomodacao from "../modelos/acomodacao";
import Diretor from "../abstracoes/diretor";

export default class DiretorFamiliaMais extends Diretor<Acomodacao> {

    constructor() {
        super()
        this.construtor = new ConstrutorAcomodacao()
    }

    public construir(): Acomodacao {
        let objetoConstrutor = this.construtor as ConstrutorAcomodacao
        objetoConstrutor.NomeAcomodacao = NomeAcomodacao.FamiliaMais
        objetoConstrutor.CamaCasal = 1
        objetoConstrutor.CamaSolteiro = 5
        objetoConstrutor.Climatizacao = true
        objetoConstrutor.Garagem = 2
        objetoConstrutor.Suite = 2
        objetoConstrutor.LimiteAcomodados = 7
        return objetoConstrutor.construir()
    }
}