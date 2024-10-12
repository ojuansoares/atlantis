import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressorEdicaoCliente from "../../impressores/impressorEdicaoCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";

export default class ListagemEdicaoDependente extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()
        console.log('Clientes Dependentes:')
        this.clientes.forEach((cliente) => {
            if (this.dependente(cliente)) {
                this.impressor = new ImpressorEdicaoCliente(cliente)
                console.log(`${this.impressor.imprimir()}`)
            }
        })
    }
    private dependente(cliente: Cliente): boolean {
        let verificacao = false
        if (cliente.Titular !== '') {
            verificacao = true
        }
        return verificacao
    }
}