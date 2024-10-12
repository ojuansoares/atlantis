export default class Telefone {
    private ddd: string
    private numero: string
    constructor(ddd: string, numero: string) {
        this.ddd = ddd
        this.numero = numero
    }
    public get Ddd() { return this.ddd }
    public get Numero() { return this.numero }

    public set Ddd(value: string) {this.ddd = value}
    public set Numero(value: string) {this.numero = value}
}