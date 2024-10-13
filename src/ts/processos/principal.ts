import Processo from "../abstracoes/processo"
import MenuPrincipal from "../menus/menuPricipal"
import ListagemAcomodacoes from "./listagens/listagemAcomodacoes"
import TipoCadastroCliente from "./tipos/tipoCadastroCliente"
import TipoListagemClientes from "./tipos/tipoListagemClientes"
import TipoEdicaoCliente from "./tipos/tipoEdicaoCliente"
import TipoDelecaoCliente from "./tipos/tipoDelecaoCliente"
import TipoCadastroHospedeAcomodacao from "./tipos/tipoCadastroHospedeAcomodacao"
import DelecaoClienteAcomodacao from "./delecoes/delecaoClienteAcomodacao"
import ListagemHospedesPorAcomodacao from "./listagens/listagemHospedesPorAcomodacao"

export default class Principal extends Processo {
    constructor() {
        super()
        this.execucao = true
        this.menu = new MenuPrincipal()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new TipoCadastroCliente()
                this.processo.processar()
                break
            case 2:
                this.processo = new TipoEdicaoCliente()
                this.processo.processar()
                break
            case 3:
                this.processo = new TipoListagemClientes()
                this.processo.processar()
                break
            case 4:
                this.processo = new TipoDelecaoCliente()
                this.processo.processar()
                break
            case 5:
                this.processo = new ListagemAcomodacoes()
                this.processo.processar()
                break
            case 6:
                this.processo = new ListagemHospedesPorAcomodacao()
                this.processo.processar()
                break
            case 7:
                this.processo = new TipoCadastroHospedeAcomodacao()
                this.processo.processar()
                break
            case 8:
                this.processo = new DelecaoClienteAcomodacao()
                this.processo.processar()
                break
            case 0:
                this.execucao = false
                console.log('Até logo!')
                console.clear()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}