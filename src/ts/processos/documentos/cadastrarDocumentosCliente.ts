import Processo from "../../abstracoes/processo";
import MenuTipoDocumento from "../../menus/menuTipoDocumento";
import Cliente from "../../modelos/cliente";
import CadastroRg from "./cadastroRg";
import CadastroCpf from "./cadastroCpf";
import CadastroPassaporte from "./cadastroPassaporte";

export default class CadastrarDocumentosCliente extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.menu = new MenuTipoDocumento()
        this.execucao = true
    }

    processar(): void {
        console.log('Inciando o cadastro de documentos...')
        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada? (CPF Obrigatório)')
            switch (this.opcao) {
                case 1:
                    if (this.cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoas Física')) {
                        console.log('Já existe um CPF cadastrado para este cliente!')
                        continue
                    }
                    this.processo = new CadastroCpf(this.cliente)
                    this.processo.processar()
                    break
                case 2:
                    this.processo = new CadastroRg(this.cliente)
                    this.processo.processar()
                    break
                case 3:
                    this.processo = new CadastroPassaporte(this.cliente)
                    this.processo.processar()
                case 0:
                    if (!this.cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoas Física')) {
                        console.log('É necessário cadastrar pelo menos um CPF')
                        continue
                    }
                    this.execucao = false
                    break
                default:
                    console.log('Opção não entendida :(')
            }
        }
    }
}