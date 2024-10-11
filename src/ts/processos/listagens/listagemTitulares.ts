import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";

export default class ListagemTitulares extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()

        if (!Armazem.InstanciaUnica.Clientes.some(c => c.Titular == '')) {
            console.log(`\nNão há Clientes Titulares para Visualizar! \nCrie um Cliente Titular Primeiro.\n`)
            return;
        }

        console.log('Iniciando a listagem dos clientes titulares...')
        this.clientes.forEach(cliente => {
            if (this.titular(cliente)) {
                this.impressor = new ImpressorCliente(cliente)
                console.log(this.impressor.imprimir())
            }
        })
        console.log('Finalizando a listagem dos clientes titulares...')
    }
    private titular(cliente: Cliente): boolean {
        let verificacao = false
        if (cliente.Titular == '') {
            verificacao = true
        }
        return verificacao
    }
}