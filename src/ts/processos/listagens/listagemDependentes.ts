import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";

export default class ListagemDependentes extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()

        if (!Armazem.InstanciaUnica.Clientes.some(c => c.Titular !== '')) {
            console.log(`\nNão há Clientes Dependentes para Visualizar! \nCrie um Cliente Dependente Primeiro.\n`)
            return;
        }

        console.log('Iniciando a listagem dos clientes dependentes...')
        this.clientes.forEach(cliente => {
            if (this.dependente(cliente)) {
                this.impressor = new ImpressorCliente(cliente)
                console.log(this.impressor.imprimir())
            }
        })
        console.log('Finalizando a listagem dos clientes dependentes...')
    }
    private dependente(cliente: Cliente): boolean {
        let verificacao = false
        if (cliente.Titular !== '') {
            verificacao = true
        }
        return verificacao
    }
}