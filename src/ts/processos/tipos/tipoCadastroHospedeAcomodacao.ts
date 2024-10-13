import Processo from "../../abstracoes/processo";
import MenuTipoCadastroHospedeAcomodacao from "../../menus/menuTipoCadastroHospedeAcomodacao";
import CadastroClienteTitularAcomodacao from "../cadastros/cadastroClienteTitularAcomodacao";
import CadastroClienteDependenteAcomodacao from "../cadastros/cadastroClienteDependenteAcomodacao";

export default class TipoCadastroHospedeAcomodacao extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoCadastroHospedeAcomodacao()
    }
    processar(): void {
        console.clear()
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        
        switch (this.opcao) {
            case 1:
                this.processo = new CadastroClienteTitularAcomodacao()
                this.processo.processar()
                break
            case 2:
                this.processo = new CadastroClienteDependenteAcomodacao()
                this.processo.processar()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}