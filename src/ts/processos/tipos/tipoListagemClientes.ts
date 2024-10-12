import Processo from "../../abstracoes/processo";
import MenuTipoListagemClientes from "../../menus/menuTipoListagemClientes";
import ListagemTitulares from "../listagens/listagemTitulares";
import ListagemDependentes from "../listagens/listagemDependentes";
import ListagemDependentesTitular from "../listagens/listagemDependentesTitular";
import ListagemTitularDependente from "../listagens/listagemTitularDependente";

export default class TipoListagemClientes extends Processo {
    constructor(){
        super()
        this.menu = new MenuTipoListagemClientes()
    }
    
    processar(): void {
        console.clear()
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new ListagemTitulares()
                this.processo.processar()
                break;
            case 2:
                this.processo = new ListagemDependentes()
                this.processo.processar()
                break;
            case 3:
                this.processo = new ListagemDependentesTitular()
                this.processo.processar()
                break;
            case 4:
                this.processo = new ListagemTitularDependente()
                this.processo.processar()
                break;
            default:
                console.log('Opção não entendida... :(')
        }
    }
}