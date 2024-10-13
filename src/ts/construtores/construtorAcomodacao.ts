import { NomeAcomodacao } from "../enumeracoes/NomeAcomodacao";
import Construtor from "../interfaces/construtor";
import Acomodacao from "../modelos/acomodacao";

export default class ConstrutorAcomodacao implements Construtor<Acomodacao>{
    private nomeAcomodacao: NomeAcomodacao = NomeAcomodacao.SolteiroSimples
    private camaSolteiro: Number = 0
    private camaCasal: Number = 0
    private suite: Number = 0
    private climatizacao: Boolean = false
    private garagem: Number = 0
    private acomodados: string[] = []
    private limiteAcomodados: Number = 0

    public set NomeAcomodacao(nomeAcomodacao: NomeAcomodacao) { this.nomeAcomodacao = nomeAcomodacao }
    public set CamaSolteiro(camaSolteiro: Number) { this.camaSolteiro = camaSolteiro }
    public set CamaCasal(camaCasal: Number) { this.camaCasal = camaCasal }
    public set Suite(suite: Number) { this.suite = suite }
    public set Climatizacao(climatizacao: Boolean) { this.climatizacao = climatizacao }
    public set Garagem(garagem: Number) { this.garagem = garagem }
    public set Acomodados(acomodados: string[]) { this.acomodados = acomodados }
    public set LimiteAcomodados(limiteAcomodados: Number) { this.limiteAcomodados = limiteAcomodados }

    construir(): Acomodacao {
        let acomodacao = new Acomodacao(this.nomeAcomodacao, this.camaSolteiro,
            this.camaCasal, this.suite, this.climatizacao, this.garagem, this.acomodados, this.limiteAcomodados)
        return acomodacao
    }
}