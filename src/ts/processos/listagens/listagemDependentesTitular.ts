import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressorDependentesTitular from "../../impressores/impressorDependentesTitular";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";

export default class ListagemDependentesTitular extends Processo {
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

        if (!Armazem.InstanciaUnica.Clientes.some(c => c.Titular !== '')) {
            console.log(`\nNão há Clientes Dependentes para Visualizar! \nCrie um Cliente Dependente Primeiro.\n`)
            return;
        }

        console.log('Iniciando a listagem dos dependentes por titular...')
        this.clientes.forEach(cliente => {
            if (this.titular(cliente)) {
                this.impressor = new ImpressorDependentesTitular(cliente)
                console.log(this.impressor.imprimir())
            }
        })
        console.log('Finalizando a listagem dos dependentes por titular...')
    }
    private titular(cliente: Cliente): boolean {
        let verificacao = false
        if (cliente.Titular == '') {
            verificacao = true
        }
        return verificacao
    }
}