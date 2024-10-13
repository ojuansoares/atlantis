import ConstrutorAcomodacao from "../construtores/construtorAcomodacao";
import { NomeAcomodacao } from "../enumeracoes/NomeAcomodacao";
import Acomodacao from "../modelos/acomodacao";
import Diretor from "../abstracoes/diretor";

export default class DiretorFamiliaSuper extends Diretor<Acomodacao> {

    constructor() {
        super()
        this.construtor = new ConstrutorAcomodacao()
    }

    public construir(): Acomodacao {
        let objetoConstrutor = this.construtor as ConstrutorAcomodacao
        objetoConstrutor.NomeAcomodacao = NomeAcomodacao.FamiliaSuper
        objetoConstrutor.CamaCasal = 2
        objetoConstrutor.CamaSolteiro = 6
        objetoConstrutor.Climatizacao = true
        objetoConstrutor.Garagem = 2
        objetoConstrutor.Suite = 3
        objetoConstrutor.LimiteAcomodados = 12
        return objetoConstrutor.construir()
    }
}