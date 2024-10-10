import Processo from "../../abstracoes/processo";
import MenuTipoDelecaoCliente from "../../menus/menuTipoDelecaoCliente";
import DelecaoClienteTitular from "../delecoes/delecaoClienteTitular";
// import DelecaoClienteDependente from "../delecoes/delecaoClienteDependente";

export default class TipoDelecaoCliente extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoDelecaoCliente()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        
        switch (this.opcao) {
            case 1:
                this.processo = new DelecaoClienteTitular()
                this.processo.processar()
                break
            // case 2:
            //     this.processo = new DelecaoClienteDependente()
            //     this.processo.processar()
            //     break
            default:
                console.log('Opção não entendida :(')
        }
    }
}