import { NomeAcomodacao } from "../enumeracoes/NomeAcomodacao"

export default class Acomodacao {
    private nomeAcomodacao: NomeAcomodacao
    private camaSolteiro: Number
    private camaCasal: Number
    private suite: Number
    private climatizacao: Boolean
    private garagem: Number
    private acomodados: string[]
    private limiteAcomodados: Number

    constructor(nomeAcomadacao: NomeAcomodacao, camaSolteiro: Number, camaCasal: Number,
        suite: Number, climatizacao: Boolean, garagem: Number, acomodados: string[], limiteAcomodados: Number) {
        this.nomeAcomodacao = nomeAcomadacao
        this.camaSolteiro = camaSolteiro
        this.camaCasal = camaCasal
        this.suite = suite
        this.climatizacao = climatizacao
        this.garagem = garagem
        this.acomodados = acomodados
        this.limiteAcomodados = limiteAcomodados
    }

    public get NomeAcomodacao() { return this.nomeAcomodacao }
    public get CamaSolteiro() { return this.camaSolteiro }
    public get CamaCasal() { return this.camaCasal }
    public get Suite() { return this.suite }
    public get Climatizacao() { return this.climatizacao }
    public get Garagem() { return this.garagem }
    public get Acomodados() { return this.acomodados }
    public get LimiteAcomodados() { return this.limiteAcomodados }
}